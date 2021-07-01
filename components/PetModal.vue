<template>
    <b-modal
        :id="id"
        ok-title="Save"
        @ok="submitForm"
        size="lg"
        @show="initModal"
        @shown="editMode && getPetData()"
        @hidden="resetModal"
    >
        <!-- Title -->
        <template #modal-title>
            <span class="font-weight-bold">{{ editMode ? `${$t('title.pet_update')} ${petId}` : $t('title.pet_upload') }}</span>
        </template>
        <!-- Content -->
        <b-overlay :show="loading" rounded="lg">
            <b-form ref="pet-form" @submit.stop.prevent="handleSubmit">
                <div class="row">
                    <b-form-group
                        id="input-group-1"
                        :label="$t('pages.pets.name')"
                        label-for="name"
                        :invalid-feedback="$t('pages.pets.invalid_feedback')"
                        class="col-6"
                    >
                        <b-form-input
                            id="name"
                            v-model="petData.name"
                            placeholder=""
                            :state="nameState"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-group-2"
                        :label="$t('pages.pets.age')"
                        label-for="age"
                        :invalid-feedback="$t('pages.pets.invalid_feedback')"
                        class="col-3"
                    >
                        <b-form-input
                            id="age"
                            v-model="petData.age"
                            :state="ageState"
                            type="number"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-group-4"
                        :label="$t('pages.pets.gender')"
                        label-for="gender"
                        :invalid-feedback="$t('pages.pets.invalid_feedback')"
                        class="col-3"
                    >
                        <b-form-select
                            id="gender"
                            v-model="petData.gender"
                            placeholder=""
                            :state="genderState"
                            required
                            :options="[{value: 'male', text: 'Male'},{value: 'female', text: 'Female'}]"
                        ></b-form-select>
                    </b-form-group>
                </div>
                <div class="row border-bottom">
                    <b-form-group
                        id="input-group-3"
                        :label="$t('pages.pets.avatar')"
                        label-for="avatar"
                        :invalid-feedback="$t('pages.pets.invalid_feedback')"
                        class="col-12"
                    >
                        <b-form-input
                            id="avatar"
                            v-model="petData.avatar"
                            :placeholder="$t('pages.pets.avatar_placeholder')"
                            :state="avatarState"
                            required
                        ></b-form-input>
                    </b-form-group>
                </div>
                <div class="row mt-4">
                    <b-form-group
                        id="input-group-5"
                        :label="$t('pages.pets.breed')"
                        label-for="breed"
                        class="col-3"
                    >
                        <b-form-input
                            id="breed"
                            v-model="petData.breed"
                            placeholder=""
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-group-6"
                        :label="$t('pages.pets.type')"
                        label-for="type"
                        class="col-3"
                    >
                        <b-form-select
                            id="type"
                            v-model="petData.type"
                            placeholder=""
                            :options="[{value: 'dog', text: 'Dog'}, {value: 'cat', text: 'Cat'}]"
                        ></b-form-select>
                    </b-form-group>
                    <b-form-group
                        id="input-group-7"
                        :label="$t('pages.pets.delivery_type')"
                        label-for="type_delivery"
                        class="col-3"
                    >
                        <b-form-select
                            id="type_delivery"
                            v-model="petData.type_delivery"
                            placeholder=""
                            :options="[{value: 'adopt', text: 'Adopt'}, {value: 'sale', text: 'For sale'}]"
                        ></b-form-select>
                    </b-form-group>
                    <b-form-group
                        id="input-group-8"
                        :label="$t('pages.pets.status')"
                        label-for="status"
                        class="col-3"
                    >
                        <b-form-select
                            id="status"
                            v-model="petData.status"
                            placeholder=""
                            :options="[{value: 'adopted', text: 'Adopted'}, {value: 'available', text: 'Available'}]"
                        ></b-form-select>
                    </b-form-group>
                </div>
                <div class="row">
                    <b-form-group
                        id="input-group-9"
                        :label="$t('pages.pets.color')"
                        label-for="color"
                        class="col-3"
                    >
                        <b-form-input
                            id="color"
                            v-model="petData.color"
                            placeholder=""
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-group-10"
                        :label="$t('pages.pets.description')"
                        label-for="description"
                        class="col-9"
                    >
                        <b-form-input
                            id="description"
                            v-model="petData.description"
                            placeholder=""
                        ></b-form-input>
                    </b-form-group>
                </div>
                
                
            </b-form>
        </b-overlay>
    </b-modal>
</template>

<script>
import { mapState } from 'vuex';

const defaultPetData = {
    avatar: '',
    name: '',
    age: '',
    gender: 'male',
    color: '',
    type: 'cat',
    status: 'available',
    type_delivery: 'adopt',
    description: '',
    breed: '',
}
export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        editMode: Boolean,
        petId: String,
    },
    data() {
        return {
            petData: { ...defaultPetData },
            avatarState: null,
            nameState: null,
            ageState: null,
            genderState: null,
            loading: false,
        };
    },
    computed: {
        ...mapState({
            token: state => state.moduleAuth.token, 
        }),
    },
    methods: {
        initModal() {
            this.resetModal();
            this.$axios.setToken(this.token, 'Bearer');
        },
        async getPetData() {
            let response;
            this.loading = true;
            try {
                response = await this.$axios.$get(`/pets/${this.petId}`);
            } catch(err) {
                this.$toasted.show(this.$t('alerts.pet_failed'), {
                    type: 'error',
                    duration: 4000,  
                });
            }
            this.petData = response.pet;
            this.loading = false;
        },
        checkFormValidity() {
            const valid = this.$refs['pet-form'].checkValidity();
            this.nameState = valid || this.petData.name.length > 0;
            this.avatarState = valid || this.petData.avatar.length > 0;
            this.ageState = valid || this.petData.age > 0;
            this.genderState = valid || this.petData.gender.length > 0;
            return valid;
        },
        resetModal() {
            this.petData = { ...defaultPetData };
            this.avatarState = null;
            this.nameState = null;
            this.ageState = null;
            this.genderState = null;
        },
        async submitForm(event) {
            event.preventDefault();
            await this.handleSubmit();
        },
        async handleSubmit() {
            if (!this.checkFormValidity()) {
                return
            }
            // call API to create pet
            let response;
            this.loading = true;
            try {
                if (this.editMode) {
                    response = await this.$axios.$put(
                        `/pets/${this.petId}`,
                        this.petData,
                    );
                } else {
                    response = await this.$axios.$post(
                        '/pets',
                        this.petData,
                    );
                }
            } catch (error) {
                this.$toasted.show(this.$t('alerts.failed'), {
                    type: 'error',
                    duration: 4000,  
                });
                this.loading = false;
                return;
            }
            this.loading = false;

            this.$toasted.show(this.$t('alerts.success'), {
                type: 'success',
                duration: 4000,  
            });
            
            // Hide the modal
            this.$nextTick(() => {
                this.$bvModal.hide(this.id);
            });
        },
    },
}
</script>

<template>
        <div class="container mt-5">
            <div  class="d-flex justify-content-center btn-create" >
                <span v-b-tooltip.hover :title="$t('common.create')" >
                    <b-icon
                        class="icon"
                        icon="plus-circle-fill"
                        variant="primary"
                        scale="2"
                        @click="createPet"
                    ></b-icon>
                </span>
            </div>
            <b-overlay :show="loading" rounded="xl">
                <b-card-group columns class="mt-5">
                    <pet-card v-for="pet in pets" :key="pet.id" :pet="pet" @edit-pet="editPet" @delete-pet="deletePet"/>
                </b-card-group>
            </b-overlay>
            <pet-modal :edit-mode="modal.editMode" id="pet-modal" :pet-id="modal.petId" @onSuccess="loadPets"/>
        </div>
</template>

<script>
import { mapState } from 'vuex';
import PetModal from '~/components/PetModal.vue';
import PetCard from '~/components/pets/PetCard.vue';

const defaultModalData = {
    editMode: false,
    petId: null,
};

export default {
    middleware: ['check_auth', 'auth'],
    components: {
        PetModal,
        PetCard,
    },
    layout: 'common',
    data() {
        return {
            modal: { ...defaultModalData },
            pets: [],
            loading: false,
        };
    },
    computed: {
        ...mapState({
            token: state => state.moduleAuth.token, 
        }),
    },
    async fetch() {
        await this.loadPets();
    },
    updated(a,b) {
        console.log('updated')
        console.log(a,b)
    },
    methods: {
        resetModal() {
            this.modal = { ...defaultModalData };
        },
        createPet() {
            this.resetModal();
            this.$bvModal.show('pet-modal');
        },
        editPet(petId) {
            this.modal = {
                editMode: true,
                petId,
            };
            this.$bvModal.show('pet-modal');
        },
        async deletePet(petId) {
            const confirm = await this.$bvModal.msgBoxConfirm(this.$t('pages.pets.confirm_text'), {
                title: this.$t('pages.pets.confirm_title'),
                okVariant: 'danger',
                okTitle: this.$t('pages.pets.confirm_yes'),
                cancelTitle: this.$t('pages.pets.confirm_no'),
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            });

            if (confirm) {
                try {
                    this.$axios.$delete(`/pets/${petId}`);
                } catch (err) {
                    this.$toasted.error(this.$t('alerts.failed'));
                    return;
                }
                await this.loadPets();
                this.$toasted.success(this.$t('alerts.success'));
            }

        },
        async loadPets() {
            this.loading = true;
            let petData;
            try {
                petData = await this.$axios.$get('/pets');
            } catch (error) {
                this.$toasted.error(this.$t('alerts.pet_failed'));
                this.loading = false;
                return;
            }
            this.loading = false;
            this.pets = petData.pets;
        },
    },
    
}
</script>

<style scoped>
.btn-create .icon:hover {
    cursor: pointer;
}
</style>

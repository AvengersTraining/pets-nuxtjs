<template>
    <div class="container">
        <b-button variant="primary" @click="createPet()">{{ $t('common.create') }}</b-button>
        <b-button variant="info" @click="editPet('170')">{{ $t('common.edit') }}</b-button>
        <pet-modal :edit-mode="modal.editMode" id="pet-modal" :pet-id="modal.petId"/>
    </div>
</template>

<script>
import PetModal from '~/components/PetModal.vue';

const defaultModalData = {
    editMode: false,
    petId: null,
};

export default {
    middleware: ['check_auth', 'auth'],
    components: {
        PetModal
    },
    data() {
        return {
            modal: { ...defaultModalData },
        };
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
    },
}
</script>

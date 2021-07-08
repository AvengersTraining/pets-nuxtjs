<template>
    <div>
        <b-card
            :img-src="formattedPet.avatar"
            img-alt="Image"
            img-top
            class="shadow"
            footer-class="py-1"
        >
            <b-card-title class="font-weight-bold">{{ formattedPet.name }}</b-card-title>
            <b-card-sub-title>{{ `${formattedPet.type} - ${formattedPet.status}` }}</b-card-sub-title>
            <b-card-text>
                {{ formattedPet.description }}
            </b-card-text>
            <b-button v-b-tooltip.hover.left :title="$t('common.edit')" variant="outline-info p-1" @click="$emit('edit-pet', formattedPet.id)">
                <b-icon icon="pencil" scale="0.9"></b-icon> {{ $t('common.edit') }}
            </b-button>
            <b-button v-b-tooltip.hover.right :title="$t('common.delete')" variant="outline-danger p-1" @click="$emit('delete-pet', formattedPet.id)">
                <b-icon icon="trash" scale="0.9"></b-icon>
            </b-button>
            <template #footer>
                <small class="text-muted">
                    {{ `Last update: ${formattedPet.updated_at}` }}
                </small>
            </template>
        </b-card>
    </div>
</template>

<script>
export default {
    props: {
        pet: Object,
    },
    computed: {
        formattedPet() {
            return {
                ...this.pet,
                id: this.pet.id.toString(),
                name: this.capitalize(this.pet.name),
                type: this.capitalize(this.pet.type),
                status: this.capitalize(this.pet.status),
                description: this.capitalize(this.pet.description),
                updated_at: this.pet.updated_at.slice(0,10),
            }
        }
    },
    methods: {
        capitalize(str) {
            if (!str) {
                return str;
            }
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
    },
}
</script>

<style scoped>
.card:hover {
    box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%) !important;
}
</style>

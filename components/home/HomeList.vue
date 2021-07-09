<template>
<div>
    <b-card :img-src="post.pet.avatar" img-alt="Image" img-top class="shadow" footer-class="py-1">
        <b-card-title class="font-weight-bold">{{ formattedPost.name }}</b-card-title>
        <b-card-sub-title>{{ `${formattedPost.type} - ${formattedPost.status}` }}</b-card-sub-title>
        <b-card-text>
          {{ `${ $t('pages.home.price')}: ${post.price} $` }}
        </b-card-text>
        <template #footer>
            <small class="text-muted">
                {{ `Last update: ${formattedPost.updated_at}` }}
            </small>
        </template>
    </b-card>
</div>
</template>

<script>
export default {
    props: {
        post: {},
    },
    computed: {
        formattedPost() {
            return {
                ...this.post,
                id: this.post.id.toString(),
                name: this.capitalize(this.post.pet.name),
                type: this.capitalize(this.post.pet.type),
                status: this.capitalize(this.post.pet.status),
                updated_at: this.post.updated_at.slice(0, 10),
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

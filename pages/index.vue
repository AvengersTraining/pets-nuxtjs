<template>
<div class="container mt-5">
    <b-overlay :show="loading" rounded="xl">
        <h4>{{ $t('pages.home.total_post') }}: {{ `${ this.total_post } ${ $t('pages.home.posts') }` }}</h4>
        <b-card-group columns class="mt-5">
            <home-list v-for="post in posts" :key="post.id" :post="post" />
        </b-card-group>
    </b-overlay>
</div>
</template>

<script>
import HomeList from '~/components/home/HomeList.vue';

export default {
    data() {
        return {
            posts: [],
            total_post: '',
            loading: true,
        }
    },
    components: {
        HomeList
    },
    middleware: ['check_auth', 'auth'],
    layout: 'common',
    async asyncData(context) {
        try {
            let response = await context.$axios.$get('/posts');

            return {
                posts: response.posts,
                total_post: response.post_quantity,
                loading: false,
            }
        } catch {
            context.$toasted.error(this.$t('alerts.post_failed'));

            return {
              loading: false,
            }
        }

    }
}
</script>

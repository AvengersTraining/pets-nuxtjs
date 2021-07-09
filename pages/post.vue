<template>
<div>
    <b-container class="mt-5">
        <b-overlay :show="loading" rounded="sm">
            <b-row>
                <b-col cols="8">
                    <List />
                </b-col>
                <b-col cols="4">
                    <Create />
                </b-col>
            </b-row>
        </b-overlay>
    </b-container>
</div>
</template>

<script>
import Create from '~/components/post/create.vue';
import List from '~/components/post/list.vue';
import { mapState } from 'vuex';

export default {
    middleware: ['check_auth', 'auth'],
    layout: 'common',
    components: {
        Create, 
        List,
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            loading: state => state.modulePost.loading,
        }),
    },    
    created() {
        this.getListPost();
        this.getListPet();
    },
    methods: {
        async getListPost() {
            await this.$store.dispatch('getListPost');
        },
        async getListPet() {
            await this.$store.dispatch('getListPet');
        },
    }
}
</script>
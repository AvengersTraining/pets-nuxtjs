<template>
    <div>
        <h1>{{ $t('pages.posts.list_post') }}</h1>
        <hr />
        <ul class="list-unstyled">
            <b-media v-for="post in listPost" :key="post.id" tag="li">
                <template #aside>
                    <b-img thumbnail fluid :src="post.pet.avatar" width="100"></b-img>
                </template>
                <h4 class="mt-0 mb-1 font-weight-bold">{{ post.pet.name }}</h4>
                <b-row>
                    <b-col cols="8">
                        <h5 class="mt-0 mb-1">{{ $t('pages.posts.price') }}: {{ post.price }}</h5>
                    </b-col>
                    <b-col>
                        <b-button variant="primary" @click="getPostInfo(post)">{{ $t('btn.detail') }}</b-button>
                        <b-button variant="danger" @click="deleteIt(post)">{{ $t('btn.delete') }}</b-button>
                    </b-col>
                </b-row>
                <hr />
            </b-media>
            <modal-detail :postInfo="postInfo" @update-post="updatePost" />
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import ModalDetail from './modalDetail.vue';
export default {
    components: {
        ModalDetail
    },
    data() {
        return {
            post: {
                pet_id: '',
                price: '',
            },
            selectedPost: '',
            postInfo: {
                price: '',
                pet : {
                    name: '',
                    gender: '',
                    age: '',
                },
            },
        }
    },
    computed: {
        ...mapState({
            listPost: state => state.modulePost.listPost,
            listPet: state => state.modulePost.listPet,
        }),
    },
    methods: {
        async deletePost() {
            this.$bvModal.hide('modal-confirm-delete-post');
            try {
                await this.$axios.$delete(`/posts/${this.selectedPost.id}`)
            } catch (err) {
                this.$toasted.error(this.$t('alerts.failed'));
                return;
            }
            const index = this.listPost.indexOf(this.selectedPost);
            if (index > -1) {
                this.listPost.splice(index, 1);
            }
            this.$toasted.success(this.$t('alerts.success'));
        },
        async getPostInfo(post) {
            let response;
            try {
                response = await this.$axios.$get(`/posts/${post.id}`)
            } catch (err) {
                this.$toasted.error(this.$t('alerts.failed'));
                return;
            }
            this.postInfo = response.post;
            this.$bvModal.show('modal-detail-post');
        },
        async updatePost(postUpdate) {
            this.post.pet_id = postUpdate.pet_id;
            this.post.price = postUpdate.price;
            let response;
            try {
                response = await this.$axios.$put(`/posts/${postUpdate.id}`, this.post)
            } catch (err) {
                this.$toasted.error(this.$t('alerts.failed'));
                return;
            }
            this.$bvModal.hide('modal-detail-post');
            this.$toasted.success(this.$t('alerts.success'));
            this.$parent.$parent.getListPost();
        },
        async deleteIt(post) {
            const confirm = await this.$bvModal.msgBoxConfirm(this.$t('pages.posts.confirm_delete'));

            if (confirm) {
                this.selectedPost = post;
                this.$bvModal.hide('modal-confirm-delete-post');
                try {
                    await this.$axios.$delete(`/posts/${this.selectedPost.id}`)
                } catch (err) {
                    this.$toasted.error(this.$t('alerts.failed'));
                    return;
                }
                const index = this.listPost.indexOf(this.selectedPost);
                if (index > -1) {
                    this.listPost.splice(index, 1);
                }
                this.$toasted.success(this.$t('alerts.success'));
            }
        }
    }
}
</script>

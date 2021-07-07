<template>
    <div>
        <h1>{{ $t('pages.posts.create_post') }}</h1>
        <hr />
        <b-card>
            <b-form @submit.stop.prevent="createPost()">
                <b-form-group 
                    id="input-group-3" 
                    :label="$t('pet')" 
                    label-for="input-3"
                >
                    <b-form-select
                    id="input-3"
                    v-model="post.pet_id"
                    :options="listPet"
                    text-field="name"
                    value-field="id"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    :label="$t('pages.posts.price')"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="post.price"
                    type="number"
                    autocomplete="off"
                    required
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="success">{{ $t('btn.create') }}</b-button>
            </b-form>
        </b-card>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            post: {
                pet_id: '',
                price: '',
            },
        }
    },
    computed: {
        ...mapState({
            listPet: state => state.modulePost.listPet,
        }),
    },
    methods: {
        async createPost() {
            let response;
            try {
                response = await this.$axios.$post('/posts', this.post);
            } catch (err) {
                this.$toasted.error(this.$t('alerts.failed'));
                return;
            }
            if (!response.record) {
                this.$toasted.error(response.message);
            } else {
                this.$toasted.success(response.message);
                this.post.pet_id = '';
                this.post.price = '';
                this.$parent.$parent.getListPost();
            }
            
        },
    }
}
</script>

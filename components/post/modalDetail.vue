<template>
    <b-modal 
        id="modal-detail-post" 
        :title="$t('pages.posts.post_detail')"
        hide-footer>
        <b-form @submit.stop.prevent="$emit('update-post', postInfo)">
            <b-form-row>
                <b-form-group class="col-4" :label="$t('pages.posts.price')" label-for="modal-post-price">
                    <b-form-input id="modal-post-price" v-model="postInfo.price" autocomplete="off" required></b-form-input>
                </b-form-group>
                <b-form-group class="col-8" :label="$t('pages.pets.name')">
                    <b-form-input v-model="postInfo.pet.name" disabled="disabled"></b-form-input>                        
                </b-form-group>
            </b-form-row>
            <b-form-row>
                <b-form-group class="col-12" :label="$t('pages.pets.avatar')">
                    <b-form-input v-model="postInfo.pet.avatar" disabled="disabled"></b-form-input>                        
                </b-form-group>
            </b-form-row>
            <b-form-row>
                <b-form-group class="col-3" :label="$t('pages.pets.gender')">
                    <b-form-input v-model="postInfo.pet.gender" disabled="disabled"></b-form-input>                        
                </b-form-group>
                <b-form-group class="col-5" :label="$t('pages.pets.type')">
                    <b-form-input v-model="postInfo.pet.type" disabled="disabled"></b-form-input>                        
                </b-form-group>
                <b-form-group class="col-4" :label="$t('pages.pets.age')">
                    <b-form-input v-model="postInfo.pet.age" disabled="disabled"></b-form-input>
                </b-form-group>
            </b-form-row>
            <b-form-row> 
               <b-form-group class="col-6" :label="$t('pages.pets.status')">
                    <b-form-input v-model="postInfo.pet.status" disabled="disabled"></b-form-input>
                </b-form-group>
                <b-form-group class="col-6" :label="$t('pages.pets.delivery_type')">
                    <b-form-input v-model="postInfo.pet.type_delivery" disabled="disabled"></b-form-input>
                </b-form-group>
            </b-form-row>
            <b-form-row> 
                <b-form-group class="col-4" :label="$t('pages.pets.breed')">
                    <b-form-input v-model="postInfo.pet.breed" disabled="disabled"></b-form-input>
                </b-form-group>
                <b-form-group class="col-4" :label="$t('pages.pets.color')">
                    <b-form-input v-model="postInfo.pet.color" disabled="disabled"></b-form-input>
                </b-form-group>
                <b-form-group class="col-4" :label="$t('pages.pets.age_type')">
                    <b-form-input v-model="postInfo.pet.ageType" disabled="disabled"></b-form-input>
                </b-form-group>
            </b-form-row>
            <b-form-row>
                <b-form-group class="col-12" :label="$t('pages.pets.description')">
                    <b-form-input v-model="postInfo.pet.description" disabled="disabled"></b-form-input>                        
                </b-form-group>
            </b-form-row>
            <b-button type="submit" variant="outline-info" block >{{ $t('btn.update') }}</b-button>
        </b-form>
    </b-modal>
</template>
<script>
import { mapState } from 'vuex';

export default {
    props: {
        postInfo: Object,
    },
}
</script>
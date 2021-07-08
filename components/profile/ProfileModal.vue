<template>
<b-modal
  :title="$t('title.update_profile')"
  id="modal-update-profile"
  @hidden="resetModal"
  centered hide-footer
>
    <b-form
      ref="profile-form"
      @submit.stop.prevent="handleSubmit"
    >
        <b-form-group
          :label="$t('pages.profile.username')"
          label-for="name-input"
          :invalid-feedback="$t('pages.profile.username_required')"
        >
            <b-form-input
              id="name"
              v-model="userProfile.username"
              :state="nameState"
            ></b-form-input>
        </b-form-group>
        <b-form-group
          :label="$t('pages.profile.avatar')"
          label-for="name-input"
        >
            <b-form-input
              id="profile"
              v-model="userProfile.avatar"
            ></b-form-input>
        </b-form-group>
        <b-form-group
          :label="$t('pages.profile.password')"
          label-for="password-input"
          :description="$t('pages.profile.description_password')"
        >
            <b-form-input
              id="password"
              type="password"
              v-model="userProfile.password"
            ></b-form-input>
        </b-form-group>
        <b-button class="w-100 mt-3" variant="outline-primary" type="submit">{{ $t('btn.update') }}</b-button>
    </b-form>
</b-modal>
</template>

<script>
import {
    mapState
} from 'vuex';

const userProfile = {
    username: '',
    password: '',
    avatar: '',
}

export default {
    data() {
        return {
            userProfile: {
                ...userProfile,
            },
            nameState: null,
        }
    },
    computed: {
        ...mapState({
            profile: state => state.moduleProfile.profile,
            token: state => state.moduleAuth.token,
        }),
    },
    mounted() {
        this.userProfile.username = this.profile.username;
        this.userProfile.avatar = this.profile.avatar;
    },
    methods: {
        resetModal() {
            // reset modal when close modal
            this.userProfile.username = this.profile.username;
            this.userProfile.avatar = this.profile.avatar;

            this.nameState = null;
        },
        checkFormValidity() {
            // Check validate username
            this.nameState = this.userProfile.username.length > 0;

            return this.nameState;
        },
        async handleSubmit() {
            if (!this.checkFormValidity()) {
                return;
            }

            if (this.userProfile.password === '') {
                delete this.userProfile.password;
            }

            await this.$axios.$put('/profile', this.userProfile)
                .then(response => {
                    if (response.record) {
                        this.$store.commit('setProfile', response.record);

                        this.$toasted.show(this.$t('message.update_success'), {
                            type: 'success',
                            duration: 4000,
                        });

                        this.$nextTick(() => {
                            this.$bvModal.hide('modal-update-profile');
                        });

                    }
                })
                .catch(error => {
                    this.$toast.error(this.$t('message.update_failed'), {
                        duration: 4000,
                    })
                });
        }
    },
}
</script>

<style>
.modal-title {
    text-align: center;
}
</style>

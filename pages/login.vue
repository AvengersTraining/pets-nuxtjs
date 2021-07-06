<template>
<div>
    <login-form @onLogin="onLogin" :errors="errors" />
</div>
</template>

<script>
import LoginForm from '~/components/LoginForm.vue';
import Error from '~/helpers/Error.js';
import Cookies from 'js-cookie';
import { statusCode } from '~/constant/index.js'

export default {
    middleware: ['check_auth', 'check_logged'],
    components: {
        LoginForm
    },
    data() {
        return {
            errors: null
        }
    },
    methods: {
        onLogin(userInfo) {
            this.errors = {};
            Error.record(this.errors);

            this.$axios.$post('/login',
                    userInfo
                )
                .then(response => {
                    // Set token in vuex
                    this.$store.commit('setToken', response.access_token);

                    // Set token in cookie
                    Cookies.set('token', response.access_token);
                    this.$toasted.success(this.$t('message.welcome'));

                    return this.$router.push('/');
                })
                .catch(error => {
                    if (error.response.status === statusCode.VALIDATION) {
                        Error.record(error.response.data.errors);
                        this.errors = error.response.data.errors;
                    }

                    if (error.response.status === statusCode.UNAUTHORIZED) {
                        this.$toast.error(this.$t('message.wrong_account_or_password'));
                    }
                });
        }
    }
}
</script>

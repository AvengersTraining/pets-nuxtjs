<template>
<div>
    <login-form @onLogin="onLogin" :errors="errors" />
</div>
</template>

<script>
import LoginForm from '~/components/LoginForm.vue';
import Error from '~/helpers/Error.js';
import Cookies from 'js-cookie';

export default {
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

                    // Set token in local and cookie
                    localStorage.setItem('token', response.access_token);
                    Cookies.set('token', response.access_token);

                    return this.$router.push('/');
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        Error.record(error.response.data.errors);
                        this.errors = error.response.data.errors;
                    }
                });
        }
    }
}
</script>

<template>
<register-form @onRegister="onRegister" :errors="errors" />
</template>

<script>
import RegisterForm from '~/components/RegisterForm.vue';
import Error from '~/helpers/Error.js';

export default {
    data() {
        return {
            errors: null
        }
    },
    components: {
        RegisterForm
    },
    methods: {
        onRegister(userRegister) {
            this.errors = null;

            this.$axios.$post('/register',
                userRegister
            ).then((response) => {
                if (response.record) {
                    this.$router.push('/login');
                }
            }).catch((error) => {
                if (error.response.status === 422) {
                    Error.record(error.response.data.errors);
                    this.errors = error.response.data.errors;
                }
            })
        }
    }
}
</script>

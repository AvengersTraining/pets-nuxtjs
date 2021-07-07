<template>
<register-form @onRegister="onRegister" :errors="errors" />
</template>

<script>
import RegisterForm from '~/components/RegisterForm.vue';
import Error from '~/helpers/Error.js';
import { statusCode } from '~/constant/index.js';

export default {
    middleware: ['check_auth', 'check_logged'],
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
                    this.$toasted.success(this.$t('message.register_success'));

                    this.$router.push('/login');
                }
            }).catch((error) => {
                if (error.response.status === statusCode.VALIDATION) {
                    Error.record(error.response.data.errors);
                    this.errors = error.response.data.errors;
                }

                if (error.response.status >= statusCode.SERVER_ERROR) {
                    this.$toasted.error(this.$t('message.register_failed'));
                }
            })
        }
    }
}
</script>

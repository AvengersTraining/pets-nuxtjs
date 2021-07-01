<template>
<div class="register-root">
    <b-card class="mb-2 form-register" title="Register">
        <b-form @submit.prevent="onRegister">
            <b-form-group id="input-group-1" label="Email address" label-for="input-1">
                <b-form-input id="input-1" :class="{ 'is-invalid' : error.get('email') }" v-model="userInfo.email">
                </b-form-input>
            </b-form-group>
            <b-form-invalid-feedback :state="validation" v-if="errors ? errors.email : ''">{{ errors.email[0] }}</b-form-invalid-feedback>
            <b-form-group id="input-group-2" label="User Name" label-for="input-2">
                <b-form-input id="input-2" :class="{'is-invalid' : error.get('username') }" v-model="userInfo.username">
                </b-form-input>
            </b-form-group>
            <b-form-invalid-feedback :state="validation" v-if="errors ? errors.username : ''">{{ errors.username[0] }}</b-form-invalid-feedback>
            <b-form-group id="input-group-2" label="Password" label-for="input-2">
                <b-form-input id="input-2" type="password" :class="{'is-invalid' : error.get('password') }" v-model="userInfo.password"></b-form-input>
            </b-form-group>
            <b-form-invalid-feedback :state="validation" v-if="errors ? errors.password : ''">{{ errors.password[0] }}</b-form-invalid-feedback>
            <b-form-group id="input-group-2" label="Password Confirm" label-for="input-2">
                <b-form-input id="input-2" type="password" v-model="userInfo.password_confirmation"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-primary" class="w-100 mb-3">{{ $t('btn.register') }}</b-button>
            <p>{{ $t('pages.register.have_account') }}
                <NuxtLink to="/login">{{ $t('btn.login') }}</NuxtLink>
            </p>
        </b-form>
    </b-card>
</div>
</template>

<script>
import Error from '~/helpers/Error.js';

export default {
    props: {
        errors: {
            type: Object,
        }
    },
    computed: {
        validation() {
            if (this.errors) {
                return false;
            }
        }
    },
    data() {
        return {
            userInfo: {
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            error: Error,
        }
    },
    methods: {
        onRegister() {
            this.$emit('onRegister', this.userInfo);
        },
    }
}
</script>

<style>
.register-root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.form-register {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
}

.card-title {
    text-align: center;
}

a {
    text-decoration: none;
}
</style>

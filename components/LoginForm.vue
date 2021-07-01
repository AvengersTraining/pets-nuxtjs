<template>
<div class="login-root">
    <b-card class="mb-2 form-login" title="Login">
        <b-form @submit.prevent="onLogin">
            <b-form-group id="input-group-1" label="User name" label-for="input-1">
                <b-form-input id="input-1" :class="{ 'is-invalid' : error.get('username') }" v-model="userInfo.username"></b-form-input>
            </b-form-group>
            <b-form-invalid-feedback :state="validation" v-if="errors ? errors.username : ''">{{ errors.username[0] }}</b-form-invalid-feedback>
            <b-form-group id="input-group-2" label="Password" label-for="input-2">
                <b-form-input id="input-2" v-model="userInfo.password" :class="{ 'is-invalid' : error.get('password') }" type="password"></b-form-input>
            </b-form-group>
            <b-form-invalid-feedback :state="validation" v-if="errors ? errors.password : ''">{{ errors.password[0] }}</b-form-invalid-feedback>
            <b-button type="submit" variant="outline-primary" class="w-100 mb-3">{{ $t('btn.login') }}</b-button>
            <p>{{ $t('pages.login.have_not_account') }}
                <NuxtLink to="/register">{{ $t('btn.register') }}</NuxtLink>
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
                password: '',
            },
            error: Error,
        }
    },
    methods: {
        onLogin() {
            this.$emit('onLogin', this.userInfo);
        },
    }
}
</script>

<style>
.login-root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.form-login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
}
</style>

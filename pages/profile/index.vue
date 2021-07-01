<template>
<div>
    <profile/>
</div>
</template>

<script>
import Profile from '~/components/profile/Profile.vue';

export default {
    middleware: ['check_auth', 'auth'],
    layout: 'common',
    components: {
        Profile
    },
    fetch(context) {
        context.$axios.setToken(context.store.getters.isAuthenticated, 'Bearer');

        return context.$axios.$get('/profile')
            .then(response => {
                context.store.dispatch('setProfile', response);
            })
            .catch(error => {
                console.log(error);
            });
    },
}
</script>

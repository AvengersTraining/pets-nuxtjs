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
}
</script>

<template>
<div>
    <app-header />
    <nuxt />
    <!-- <app-footer /> -->
</div>
</template>

<script>
import AppHeader from '~/layouts/AppHeader.vue'
import AppFooter from '~/layouts/AppFooter.vue'

export default {
    components: {
        AppHeader,
        AppFooter
    },
}
</script>

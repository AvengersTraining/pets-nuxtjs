<template>
<div>
    <!-- TODO HOME PAGE -->
    <h1>Home</h1>
</div>
</template>

<script>
export default {
    middleware: ['check_auth', 'auth'],
    layout: 'common',
}
</script>

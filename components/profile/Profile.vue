<template>
<div class="profile-root">
    <b-card :title="$t('profile')" img-top tag="article" style="max-width: 600px; width: 400px;" class="mb-2" v-if="profile">
        <div class="profile-info">
            <div>
                <b-avatar variant="info" class="mr-4" size="4rem" />
            </div>
            <div class="info">
                <div>
                    <b>{{ $t('pages.profile.username') }}:</b>
                    <span>{{ profile.username }}</span>
                </div>
                <div>
                    <b>{{ $t('pages.profile.email') }}:</b>
                    <span>{{ profile.email }}</span>
                </div>
                <div>
                    <b>{{ $t('pages.profile.created_at') }}:</b>
                    <span>{{ formatDate(new Date(profile.created_at)) }}</span>
                </div>
            </div>
        </div>
    </b-card>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';

import formatDate from '~/helpers/Date';

export default {
    data() {
        return {
            formatDate: formatDate,
        }
    },
    computed: {
        ...mapGetters([
            'profile',
        ])
    }
}
</script>

<style>
.profile-root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.profile-info {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-title {
    text-align: center;
}
</style>

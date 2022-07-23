<template>
    <v-btn
        class="drives-filter-mobile-trigger"
        color="primary"
        fixed
        bottom
        right
        fab
        @click="$emit('open')"
    >
        <v-icon>{{ $options.icons.mdiFilter }}</v-icon>
    </v-btn>
</template>

<script>
import { mdiFilter } from '@mdi/js';

export default {
    name: 'drives-filter-mobile-trigger',

    icons: {
        mdiFilter
    }
};
</script>

<style>
.drives-filter-mobile-trigger.drives-filter-mobile-trigger {
    bottom: 70px;
}
</style>

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
        <v-icon>{{ mdiFilter }}</v-icon>
    </v-btn>
</template>

<script setup>
import { mdiFilter } from '@mdi/js';
</script>

<style>
.drives-filter-mobile-trigger.drives-filter-mobile-trigger {
    bottom: 70px;
}
</style>

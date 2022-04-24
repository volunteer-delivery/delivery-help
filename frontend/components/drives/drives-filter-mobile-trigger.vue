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
        <v-icon>mdi-filter</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'drives-filter-mobile-trigger'
};
</script>

<style>
.drives-filter-mobile-trigger.drives-filter-mobile-trigger {
    transform: translateY(50%);
    bottom: 56px;
}
</style>

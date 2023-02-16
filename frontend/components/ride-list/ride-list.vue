<template>
    <RideListEmpty v-if="isEmpty" />

    <template v-else>
        <RideListItem
            class="mb-sm-4"
            v-for="ride of rides"
            :key="ride.id"
            :ride="ride"
        />
    </template>
</template>

<script lang="ts" setup>
const props = defineProps({
    rides: {
        type: Array,
        required: true,
    },
});

const isEmpty = computed(() => !props.rides.length);
</script>

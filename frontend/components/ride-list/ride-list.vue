<template>
    <RideListEmpty v-if="isEmpty" />

    <div class="grid gap-4 md:grid-cols-[repeat(auto-fit,_minmax(448px,1fr))] md:max-w-[912px]" v-else>
        <RideListItem
            v-for="(ride, index) of rides"
            :key="ride.id"
            :ride="ride"
            :class="{ 'border-none': index + 1 === rides.length }"
        />
    </div>
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

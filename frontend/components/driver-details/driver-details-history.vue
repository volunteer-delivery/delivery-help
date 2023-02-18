<template>
    <ul class="m-0 p-0">
        <DriverDetailsHistoryRide
            v-for="ride of rides"
            :key="ride.id"
            :ride="ride"
        />
    </ul>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Driver } from '~/stores/rides-store';

const props = defineProps({
    driver: {
        type: Object as PropType<Driver>,
        required: true,
    },
});

const ridesStore = useRidesStore();

const rides = ridesStore.loadRidesByDriver(props.driver);
</script>

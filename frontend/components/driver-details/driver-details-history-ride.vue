<template>
    <li class="flex items-center py-3">
        <time class="text-gray-500 grow basis-0">
            {{ departureTime }}
        </time>

        <p class="my-0 ml-4 grow basis-0">
            {{ fromAddress }}
        </p>

        <div class="ml-2 flex items-center">
            <div class="w-5 bg-blue-800 h-0.5" />
            <div class="history-ride-arrow" />
        </div>

        <p class="my-0 ml-4 grow basis-0 text-right">
            {{ toAddress }}
        </p>
    </li>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { Ride, RidePathPoint } from '~/stores/ride-details-store';

const props = defineProps({
    ride: {
        type: Object as PropType<Ride>,
        required: true,
    },
});

const from = computed(() => props.ride.path[0]);
const to = computed(() => props.ride.path.slice().pop()!);

const departureTime = computed(() => formatDate(from.value.departureTime!));

function formatAddress({ address }: RidePathPoint): string {
    return address.city || address.country;
}

const fromAddress = computed(() => formatAddress(from.value));
const toAddress = computed(() => formatAddress(to.value));
</script>

<style scoped>
.history-ride-arrow {
    border: 6px solid transparent;
    @apply border-l-blue-800;
}
</style>

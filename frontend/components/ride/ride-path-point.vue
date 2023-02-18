<template>
    <div class="flex items-end relative pl-6 leading-none text-xl text-gray-700 path__point" :class="pointClasses">
        <p class="ma-0">
            {{ location }}
        </p>

        <span class="path__point-date text-gray-500 text-base leading-none" v-if="departureTime">
            , {{ departureTime }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RidePathPoint } from '~/stores/rides-store';

const props = defineProps({
    point: {
        type: Object as PropType<RidePathPoint>,
        required: true,
    },
    first: {
        type: Boolean,
        required: true,
    },
});

const address = computed(() => props.point.address);
const isUkraine = computed(() => address.value.country === 'Україна');
const location = computed(() => isUkraine.value ? address.value.city : address.value.country);

const departureTime = computed(() => props.point.departureTime && formatDate(props.point.departureTime));

const pointClasses = computed(() => ({ 'before:bg-blue-800': props.first }));
</script>

<style scoped>
.path__point::before {
    content: "";
    @apply absolute block w-2.5 h-2.5 rounded-full -translate-y-1/2 top-1/2 left-1 border-2 border-blue-800
}
</style>

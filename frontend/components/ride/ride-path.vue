<template>
    <div class="font-medium">
        <template v-for="(point, index) of path" :key="point.address.id">
            <RidePathPoint :point="point" :first="index === 0" />
            <RidePathLine v-if="index + 1 !== path.length" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RidePath, RidePathPoint } from '~/stores/ride-details-store';

const props = defineProps({
    path: {
        type: Array as PropType<RidePath>,
        required: true,
    },
});
</script>

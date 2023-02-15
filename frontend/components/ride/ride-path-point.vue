<template>
    <div class="flex items-end relative pl-6 leading-none text-xl text-gray-700 path__point">
        <p class="ma-0">
            {{ location }}
        </p>

        <span class="path__point-date text-gray-500 text-base leading-none" v-if="departureTime">
            , {{ departureTime }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import type {RidePathPoint} from "~/stores/rides-store";

const props = defineProps({
    point: {
        type: Object as PropType<RidePathPoint>,
        required: true
    }
});

const address = computed(() => props.point.address);
const isUkraine = computed(() => address.value.country === 'Україна');
const location = computed(() => isUkraine.value ? address.value.city : address.value.country);

const departureTime = computed(() => props.point.departureTime && formatDate(props.point.departureTime));
</script>

<style scoped>
.path__point::before {
    position: absolute;
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translateY(-50%);
    top: 50%;
    left: 4px;
    border: 2px solid #3F51B5;
}

.path__point:first-child::before {
    background-color: #3F51B5;
}
</style>

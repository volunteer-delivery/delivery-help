<template>
    <div class="flex items-end path__point">
        <p class="ma-0">
            {{ location }}
        </p>

        <span class="path__point-date" v-if="departureTime">
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
.path__point {
    position: relative;
    padding-left: 24px;
    color: #424242;
    font-size: 19px;
    line-height: 1;
}

.path__point-date {
    font-size: 16px;
    line-height: 1;
    color: #757575;
}

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

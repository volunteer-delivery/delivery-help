<template>
    <p>{{ ride.id }}</p>
</template>

<script lang="ts" setup>
import {PropType} from "vue";
import {Ride} from "~/stores/rides-store";

defineProps({
    ride: {
        type: Object as PropType<Ride>,
        required: true
    }
});
</script>

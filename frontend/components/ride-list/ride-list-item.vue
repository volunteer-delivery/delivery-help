<template>
    <section class="p-4 border-b border-b-slate-300">
        <RidePath :path="ride.path" />
    </section>
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

<template>
    <p>{{ location }}</p>
</template>

<script setup>
const props = defineProps({
    point: {
        type: Object,
        required: true
    }
});

const isUkraine = computed(() => props.point.country === 'Україна');
const location = computed(() => isUkraine.value ? props.point.city : props.point.country);
</script>

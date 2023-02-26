<template>
    <RideList :rides="ridesStore.done" />
</template>

<script lang="ts" setup>
const ridesStore = useRidesStore();
</script>

<template>
    <RideList :rides="ridesStore.active" />
</template>

<script lang="ts" setup>
const ridesStore = useRidesStore();
</script>

<template>
    <RideList :rides="ridesStore.pendingFiltered" />
</template>

<script lang="ts" setup>
import {RideListFilterTrigger} from "#components";

const ridesStore = useRidesStore();
const navigationStore = useNavigationStore();

navigationStore.setExtra(RideListFilterTrigger);
onUnmounted(() => navigationStore.resetExtra());
</script>

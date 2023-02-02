<template>
    <DriveList :drives="drivesStore.done" />
</template>

<script setup>
import DriveList from '~/components/drives/drive-list';

const drivesStore = useDrivesStore();
</script>

<template>
    <DriveList :drives="drivesStore.active" />
</template>

<script setup>
import DriveList from '~/components/drives/drive-list';

const drivesStore = useDrivesStore();
</script>

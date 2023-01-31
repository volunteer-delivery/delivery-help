<template>
    <DriveList :drives="drivesStore.active" />
</template>

<script setup>
import DriveList from '~/components/drives/drive-list';
import {useDrivesStore} from "~/store/drives-store";

const drivesStore = useDrivesStore();
</script>

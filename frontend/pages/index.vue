<template>
    <DriveList :drives="drivesStore.pendingFiltered" />
</template>

<script setup>
import DrivesFilter from '~/components/drives/drives-filter';
import DriverFilterMobileTrigger from '~/components/drives/drives-filter-mobile-trigger';
import DriveList from '@/components/drives/drive-list';
import {useDrivesStore} from "~/store/drives-store";
import {useNavigationStore} from "~/store/navigation-store";

const drivesStore = useDrivesStore();
const navigationStore = useNavigationStore();

onBeforeRouteUpdate((to, from, next) => {
    navigationStore.setExtra({
        view: DrivesFilter,
        mobileTrigger: DriverFilterMobileTrigger
    });
    next();
});

onBeforeRouteLeave((to, from, next) => {
    navigationStore.setExtra(null);
    next();
});
</script>

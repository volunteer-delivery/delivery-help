<template>
    <RideList :rides="ridesStore.pendingFiltered" />
</template>

<script lang="ts" setup>
const ridesStore = useRidesStore();
// import DrivesFilter from '~/components/drives/drives-filter';
// import DriverFilterMobileTrigger from '~/components/drives/drives-filter-mobile-trigger';
// import DriveList from '@/components/drives/drive-list';
//
// const ridesStore = useRidesStore();
// const navigationStore = useNavigationStore();
//
// onBeforeRouteUpdate((to, from, next) => {
//     navigationStore.setExtra({
//         view: DrivesFilter,
//         mobileTrigger: DriverFilterMobileTrigger
//     });
//     next();
// });
//
// onBeforeRouteLeave((to, from, next) => {
//     navigationStore.setExtra(null);
//     next();
// });
</script>

<template>
    <AppBackButton class="-mt-2 mb-3 ml-1" />

    <div class="px-4">
        <RideInfo class="mb-6" :ride="ride" />
        <RideDetailsStatus class="mb-10" />
        <Suspense>
            <RideDetailsCommentList />
        </Suspense>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const rideDetailsStore = useRideDetailsStore();

const ride = rideDetailsStore.load(route.params.id as string);

onBeforeRouteLeave((to, from, next) => {
    next();
    rideDetailsStore.off();
});
</script>

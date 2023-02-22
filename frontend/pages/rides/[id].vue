<template>
    <AppBackButton class="-mt-2 mb-3" />
    <RideInfo class="px-2.5" :ride="ride" />

<!--    <v-row class="ml-0 mr-0" justify="center" align="center">-->
<!--        <v-col class="pa-0 pa-sm-3 pt-sm-7" cols="12" sm="8" md="4">-->
<!--            <DriveDetailsStatusSwitcher class="mb-3" :drive="drive" />-->
<!--            <DriveDetailsCommentList :drive="drive" :comments="comments" />-->
<!--        </v-col>-->
<!--    </v-row>-->
</template>

<script lang="ts" setup>
const route = useRoute();
const rideDetailsStore = useRideDetailsStore();

const ride = rideDetailsStore.load(route.params.id as string);

// const http = useHttpClient();
// const apiCable = useApiCable();
// const route = useRoute();
//
// const { data: comments } = useAsyncData('comments', () => http.get(`/rides/${route.params.id}/comments`));
//
// apiCable.on(`rides/${drive.value.id}/comments/new`, (comment) => {
//     comments.value.unshift(comment);
// });
</script>

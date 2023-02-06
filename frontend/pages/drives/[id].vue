<template>
    <v-row class="ml-0 mr-0" justify="center" align="center">
        <v-col class="pa-0 pa-sm-3 pt-sm-7" cols="12" sm="8" md="4">
            <v-btn class="mt-n3 mb-md-3 pl-0 pl-md-3 ml-md-n3" text tile elevation="0" @click="$router.back()">
                <v-icon class="mr-3">
                    {{ mdiArrowLeft }}
                </v-icon>

                Назад
            </v-btn>

            <DrivesDrive class="drive-details__info mb-3" :drive="drive" hide-actions/>

            <DriveDetailsStatusSwitcher class="mb-3" :drive="drive" />
            <DriveDetailsCommentList :drive="drive" :comments="comments" />
        </v-col>
    </v-row>
</template>

<script setup>
import {mdiArrowLeft} from '@mdi/js';

const http = useHttpClient();
const apiCable = useApiCable();
const drivesStore = useDrivesStore();
const route = useRoute();

const { data: comments } = useAsyncData('comments', () => http.get(`/rides/${route.params.id}/comments`));
const drive = computed(() => drivesStore.drives.find(drive => drive.id === route.params.id));

apiCable.on(`rides/${drive.value.id}/comments/new`, (comment) => {
    comments.value.unshift(comment);
});
</script>

<style scoped>
.drive-details__info {
    border-radius: 0;
    border-bottom: none !important;
    box-shadow: none !important;
}

.drive-details__info::v-deep .v-card__text {
    padding-left: 0;
    padding-right: 0;
}
</style>

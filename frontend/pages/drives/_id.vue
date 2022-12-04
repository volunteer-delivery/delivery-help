<template>
    <v-row class="ml-0 mr-0" justify="center" align="center">
        <v-col class="pa-0 pa-sm-3 pt-sm-7" cols="12" sm="8" md="4">
            <v-btn class="mt-n3 mb-md-3 pl-0 pl-md-3 ml-md-n3" text tile elevation="0" @click="$router.back()">
                <v-icon class="mr-3">
                    {{ $options.icons.mdiArrowLeft }}
                </v-icon>

                Назад
            </v-btn>

            <drive class="drive-details__info mb-3" :drive="drive" hide-actions/>

            <StatusSwitcher class="mb-3" :drive="drive" />
            <CommentList :drive="drive" :comments="comments" />
        </v-col>
    </v-row>
</template>

<script>
import {mdiArrowLeft} from '@mdi/js';
import {Drive} from '~/components/drives';
import {CommentList, StatusSwitcher} from "~/components/drive-details";
import {ApiCableMixin} from "~/mixins";

export default {
    name: 'id',

    components: {
        CommentList,
        StatusSwitcher,
        Drive
    },

    mixins: [
        ApiCableMixin
    ],

    icons: {
        mdiArrowLeft
    },

    async asyncData({$axios, params}) {
        const response = await $axios.get(`/rides/${params.id}/comments`);

        return {comments: response.data.comments};
    },

    computed: {
        driveId() {
            return this.$route.params.id;
        },

        drive() {
            const drives = this.$store.state['drives-store'].drives;
            return drives.find(drive => drive.id === this.driveId);
        }
    },

    created() {
        this.listApiEvent(`rides/${this.driveId}/comments/new`, (comment) => {
            this.comments.unshift(comment);
        });
    }
};
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

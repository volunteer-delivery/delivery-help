<template>
    <v-row class="ml-0 mr-0" justify="center" align="center">
        <v-col class="pa-0 pa-sm-3 pt-sm-7" cols="12" sm="8" md="4">
            <v-btn class="mt-n3 mb-md-3 pl-0 pl-md-3 ml-md-n3" text tile elevation="0" @click="$router.back()">
                <v-icon class="mr-3">
                    {{ $options.icons.mdiArrowLeft }}
                </v-icon>

                Назад
            </v-btn>

            <drive class="drive-details__info mb-3" :drive="drive" hide-actions />

            <v-form class="comment-form" @submit="sendComment">
                <v-textarea
                    v-model="newComment"
                    label="Додати коментар"
                    rows="1"
                    auto-grow
                />

                <v-btn class="ml-2 mb-6" color="primary" type="submit" icon text>
                    <v-icon class="comment-form__send-icon">
                        {{ $options.icons.mdiSend }}
                    </v-icon>
                </v-btn>
            </v-form>

            <v-list class="comments">
                <Comment
                    v-for="comment of comments"
                    :key="comment.id"
                    :comment="comment"
                    :now="now"
                />
            </v-list>
        </v-col>
    </v-row>
</template>

<script>
import { mdiArrowLeft, mdiSend } from '@mdi/js';
import Drive from '@/components/drives/drive';
import Comment from '@/components/drives/comment';

export default {
    name: 'id',

    components: {
        Comment,
        Drive
    },

    icons: {
        mdiArrowLeft,
        mdiSend
    },

    async asyncData({ $axios, params }) {
        const { data: comments } = await $axios.get(`/rides/${params.id}/comments`);

        return { comments };
    },

    data: () => ({
        newComment: '',
        now: Date.now()
    }),

    computed: {
        drive() {
            const drives = this.$store.state['drives-store'].drives;
            return drives.find(drive => drive.id === this.driveId);
        },

        driveId() {
            return this.$route.params.id;
        }
    },

    created() {
        this.timeUpdater = setInterval(() => this.now = Date.now(), 5000);
        this.$cable.on(`newRideComment:${this.driveId}`, this.addComment);
    },

    destroyed() {
        clearInterval(this.timeUpdater);
        this.$cable.off(`newRideComment:${this.driveId}`, this.addComment);
    },

    methods: {
        sendComment(event) {
            event.preventDefault();

            if (!this.newComment) return;

            this.$axios.post(`/rides/${this.driveId}/comments`, {
                text: this.newComment
            });
            this.newComment = '';
        },

        addComment(comment) {
            this.comments.unshift(comment);
        }
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

.comment-form {
    display: flex;
    align-items: flex-end;
}

.comment-form__send-icon {
    transform: rotate(-45deg);
}
</style>

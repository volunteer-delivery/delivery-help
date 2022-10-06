<template>
    <div>
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

        <v-list>
            <Comment
                v-for="comment of comments"
                :key="comment.id"
                :comment="comment"
                :now="now"
            />
        </v-list>
    </div>
</template>

<script>
import Comment from "./comment";
import {mdiSend} from "@mdi/js";

export default {
    name: "comment-list",

    components: {
        Comment
    },

    icons: {
        mdiSend
    },

    props: {
        comments: {
            type: Array,
            required: true
        },

        drive: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        newComment: '',
        now: Date.now()
    }),

    created() {
        this.timeUpdater = setInterval(() => this.now = Date.now(), 5000);
    },

    destroyed() {
        clearInterval(this.timeUpdater);
    },

    methods: {
        sendComment(event) {
            event.preventDefault();

            if (!this.newComment) return;

            this.$axios.post(`/rides/${this.drive.id}/comments`, {
                text: this.newComment
            });
            this.newComment = '';
        }
    }
}
</script>

<style scoped>
.comment-form {
    display: flex;
    align-items: flex-end;
}

.comment-form__send-icon {
    transform: rotate(-45deg);
}
</style>

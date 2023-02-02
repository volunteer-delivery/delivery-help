<template>
    <v-form class="comment-form" @submit="sendComment">
        <v-textarea
            v-model="newComment"
            label="Додати коментар"
            rows="1"
            auto-grow
        />

        <v-btn class="ml-2 mb-6" color="primary" type="submit" icon text>
            <v-icon class="comment-form__send-icon">
                {{ mdiSend }}
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
</template>

<script setup>
import Comment from "./comment";
import {mdiSend} from "@mdi/js";

const props = defineProps({
    comments: {
        type: Array,
        required: true
    },

    drive: {
        type: Object,
        required: true
    }
});

const http = useHttpClient();
const newComment = ref('');

const now = ref(Date.now());
const timeUpdater = setInterval(() => now.value = Date.now(), 5000);
onUnmounted(() => clearInterval(timeUpdater))

function sendComment(event) {
    event.preventDefault();

    if (!newComment.value) return;

    http.post(`/rides/${this.drive.id}/comments`, { text: newComment.value });
    newComment.value = '';
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

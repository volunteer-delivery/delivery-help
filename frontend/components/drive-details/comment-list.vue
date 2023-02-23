<template>
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
/* eslint-disable */
import Comment from './comment';

const props = defineProps({
    comments: {
        type: Array,
        required: true,
    },

    drive: {
        type: Object,
        required: true,
    },
});

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

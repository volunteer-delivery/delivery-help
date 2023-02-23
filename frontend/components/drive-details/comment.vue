<template>
    <v-list-item class="comment">
        <v-list-item-content>
            <v-list-item-title>
                <pre class="comment__item-text">{{ comment.text }}</pre>
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
    now: {
        type: Number,
        required: true,
    },
});

</script>

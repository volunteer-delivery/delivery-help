<template>
    <li>
        <p class="mt-0 mb-1 flex items-end">
            <span class="font-medium">
                {{ comment.author.name }}
            </span>

            <time class="text-gray-400 text-sm ml-2">
                {{ createdAt }}
            </time>
        </p>

        <pre class="comment-text">{{ comment.text }}</pre>
    </li>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RideComment } from '~/stores/ride-details-store';

const props = defineProps({
    comment: {
        type: Object as PropType<RideComment>,
        required: true,
    },
    now: {
        type: Date,
        required: true,
    },
});

function isSameDay(date: Date): boolean {
    if (date.getFullYear() !== props.now.getFullYear()) return false;
    if (date.getMonth() !== props.now.getMonth()) return false;
    return date.getDate() === props.now.getDate();
}

function isSameHour(date: Date): boolean {
    return props.now.getHours() <= date.getHours();
}

function isSameMinute(date: Date): boolean {
    return props.now.getMinutes() <= date.getMinutes();
}

const createdAt = computed(() => {
    const date = new Date(props.comment.createdAt);

    if (!isSameDay(date)) {
        return date.toLocaleDateString();
    }

    if (!isSameHour(date)) {
        return `${props.now.getHours() - date.getHours()}г назад`;
    }

    if (!isSameMinute(date)) {
        return `${props.now.getMinutes() - date.getMinutes()}хв назад`;
    }

    const secondsAgo = props.now.getSeconds() - date.getSeconds();

    if (secondsAgo < 5) {
        return 'Щойно';
    }

    return `${secondsAgo}с назад`;
});
</script>

<style scoped>
.comment-text {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
}
</style>

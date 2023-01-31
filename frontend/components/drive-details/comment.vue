<template>
    <v-list-item class="comment">
        <v-list-item-content>
            <v-list-item-title class="mb-2">
                <span class="font-weight-bold">{{ comment.author.name }}</span>

                <time class="comment__item-date">
                    {{ createdAt }}
                </time>
            </v-list-item-title>

            <v-list-item-title>
                <pre class="comment__item-text">{{ comment.text }}</pre>
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script setup>
const props = defineProps({
    comment: {
        type: Object,
        required: true
    },
    now: {
        type: Number,
        required: true
    }
});

function isSameDay(now, date) {
    if (date.getFullYear() !== now.getFullYear()) return false;
    if (date.getMonth() !== now.getMonth()) return false;
    return date.getDate() === now.getDate();
}

function isSameHour(now, date) {
    return now.getHours() <= date.getHours();
}

function isSameMinute(now, date) {
    return now.getMinutes() <= date.getMinutes();
}

const createdAt = computed(() => {
    const date = new Date(this.comment.createdAt);
    const now = new Date(this.now);

    if (!isSameDay(now, date)) {
        return date.toLocaleDateString();
    }

    if (!isSameHour(now, date)) {
        return (now.getHours() - date.getHours()) + 'г назад';
    }

    if (!isSameMinute(now, date)) {
        return (now.getMinutes() - date.getMinutes()) + 'хв назад';
    }

    const secondsAgo = now.getSeconds() - date.getSeconds();

    if (secondsAgo < 5) {
        return 'Щойно'
    }

    return secondsAgo + 'с назад';
});
</script>

<style scoped>
.comment {
    padding: 0;
}

.comment__item-date {
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.8rem;
}

.comment__item-text {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
}
</style>

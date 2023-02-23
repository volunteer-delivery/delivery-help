<template>
    <div>
        <RideDetailsNewComment class="mb-4" />
        <ul>
            <li v-for="comment of comments" :key="comment.id">
                {{ comment.text }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const rideDetailsStore = useRideDetailsStore();
const { data: comments } = await useAsyncData('comments', () => rideDetailsStore.loadComments());
</script>

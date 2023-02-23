<template>
    <div>
        <RideDetailsNewComment class="mb-6" />

        <ul class="p-0 m-0 list-none">
            <RideDetailsComment
                v-for="comment of comments"
                class="mb-4"
                :key="comment.id"
                :comment="comment"
                :now="now"
            />
        </ul>
    </div>
</template>

<script lang="ts" setup>
const rideDetailsStore = useRideDetailsStore();
const { data: comments } = await useAsyncData('comments', () => rideDetailsStore.loadComments());

const now = useLiveTime();
</script>

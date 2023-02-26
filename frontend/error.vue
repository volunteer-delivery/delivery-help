<template>
    <div>
        <h1 class="error__title">
            {{ title }}
        </h1>

        <NuxtLink to="/">
            Home page
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    error: {
        type: Object,
        default: null,
    },
});

const title = computed(() => props.error.statusCode === 404 ? '404 Not Found' : 'An error occurred');

useHead({ title });
</script>

<style scoped>
.error__title {
    font-size: 20px;
}
</style>

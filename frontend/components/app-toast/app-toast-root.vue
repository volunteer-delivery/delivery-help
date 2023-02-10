<template>
    <TransitionGroup class="fixed top-0 left-0 w-full" duration="150" name="toast" tag="div">
        <AppToast
            v-for="toast of toastStore.list"
            :toast="toast"
            :key="toast.id"
            class="w-full relative z-50 "
        />
    </TransitionGroup>
</template>

<script lang="ts" setup>
const toastStore = useToastStore();
</script>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
    @apply transition-transform duration-150;
}

.toast-enter-from,
.toast-leave-to {
    @apply -translate-y-full;
}

.toast-leave-active {
    @apply absolute z-40;
}
</style>

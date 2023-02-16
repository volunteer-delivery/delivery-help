<template>
    <TransitionGroup name="modal" :duration="{ enter: 200, leave: 150 }">
        <div
            v-for="modal of modalStore.list"
            :key="modal.id"
            class="fixed bottom-0 left-0 w-full h-full z-50 bg-slate-800/75"
        >
            <AppModalContent :modal="modal" />
        </div>
    </TransitionGroup>
</template>

<script lang="ts" setup>
const modalStore = useModalStore();
const lockScroll = useScrollLock(document.body);

watch(toRef(modalStore, 'list'), (modals) => {
    lockScroll.value = !!modals.length;
}, { deep: true });
</script>

<style scoped>
.modal-enter-active {
    @apply transition-opacity duration-200;
}

.modal-enter-active .modal-content {
    @apply transition-transform duration-200;
}

.modal-leave-active {
    @apply transition-opacity duration-150;
}

.modal-enter-from {
    @apply opacity-0;
}

.modal-enter-from .modal-content {
    @apply translate-y-[5%] md:-translate-y-1/2 md:-translate-x-1/2 md:scale-95;
}

.modal-leave-to {
    @apply opacity-0;
}
</style>

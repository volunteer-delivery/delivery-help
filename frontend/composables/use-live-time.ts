import type { Ref } from 'vue';

export function useLiveTime(): Ref<Date> {
    const now = ref(new Date());

    if (process.client) {
        const intervalId = setInterval(() => now.value = new Date(), 5000);
        onUnmounted(() => clearInterval(intervalId));
    }

    return computed(() => now.value);
}

import type { Ref } from 'vue';

export function useLiveTime(): Ref<Date> {
    const now = ref(Date.now());

    if (process.client) {
        const intervalId = setInterval(() => now.value = Date.now(), 5000);
        onUnmounted(() => clearInterval(intervalId));
    }

    return computed(() => new Date(now.value));
}

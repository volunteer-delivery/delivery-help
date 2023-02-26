import type { Component } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', () => {
    const router = useRouter();

    const extra = ref<Component | null>(null);
    const setExtra = (newExtra: Component): void => void (extra.value = markRaw(newExtra));
    const resetExtra = (): void => void (extra.value = null);

    const previousRoute = ref<RouteLocationNormalized | null>(null);
    router.afterEach((_, from) => previousRoute.value = from);

    return { extra, setExtra, resetExtra, previousRoute };
});

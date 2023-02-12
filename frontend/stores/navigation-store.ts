import type {Component} from "vue";
import {defineStore} from "pinia";

export const useNavigationStore = defineStore('navigation', () => {
    const extra = ref<Component | null>(null);

    const setExtra = (newExtra: Component) => extra.value = markRaw(newExtra);
    const resetExtra = () => extra.value = null;

    return { extra, setExtra, resetExtra };
});

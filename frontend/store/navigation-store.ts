import {defineStore} from "pinia";

export const useNavigationStore = defineStore('navigation', () => {
    const extra = ref(null);
    const extraOpened = ref(false);

    function setExtra(extra: any) {
        extra.value = extra;
        extraOpened.value = false;
    }

    const openExtra = () => extraOpened.value = true;
    const closeExtra = () => extraOpened.value = false;

    return {
        extra,
        extraOpened,
        setExtra,
        openExtra,
        closeExtra
    };
});

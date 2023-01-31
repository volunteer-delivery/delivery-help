import {ApiCableHandler, ApiCableOff} from "~/plugins/api-cable.client";

export function useApiCable() {
    const nuxt = useNuxtApp();
    const offs: ApiCableOff[] = [];

    function on<Payload extends object>(event: string, handler: ApiCableHandler<Payload>) {
        const off = nuxt.$apiCable.on(event, handler);
        offs.push(off);
        return off;
    }

    onUnmounted(() => {
        for (const off of offs) off();
    });

    return { on };
}

import { ApiCableHandler, ApiCableOff } from '~/plugins/api-cable.client';

interface IApiCable {
    on<Payload extends object>(event: string, handler: ApiCableHandler<Payload>): ApiCableOff;
}

export function useApiCable(): IApiCable {
    const nuxt = useNuxtApp();
    const offs: ApiCableOff[] = [];

    function on<Payload extends object>(event: string, handler: ApiCableHandler<Payload>): ApiCableOff {
        const off = nuxt.$apiCable.on(event, handler);
        offs.push(off);
        return off;
    }

    onUnmounted(() => {
        for (const off of offs) off();
    });

    return { on };
}

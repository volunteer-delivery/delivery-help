import { connect, Socket } from 'socket.io-client';

export type ApiCableHandler<Payload extends object> = (payload: Payload) => void | Promise<void>;
export type ApiCableOff = () => void;

class ApiCable {
    private socket: Socket;

    constructor(url: string) {
        this.socket = connect(url, {
            transports: ['websocket'],
            path: '/websocket'
        });
    }

    on<Payload extends object>(event: string, handler: ApiCableHandler<Payload>): ApiCableOff {
        this.socket.on(event, handler);
        return () => this.off(event, handler);
    }

    off<Payload extends object>(event: string, handler: ApiCableHandler<Payload>) {
        this.socket.off(event, handler);
    }
}

export default defineNuxtPlugin((nuxt) => {
    const { socketUrl } = useRuntimeConfig().public;
    return {
        provide: {
            apiCable: new ApiCable(socketUrl)
        }
    };
})

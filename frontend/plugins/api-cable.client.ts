import { connect, Socket } from 'socket.io-client';

export type ApiCableHandler<Payload extends object> = (payload: Payload) => void | Promise<void>;
export type ApiCableOff = () => void;

class ApiCable {
    private socket: Socket;

    constructor(url: string) {
        this.socket = connect(url, {
            transports: ['websocket'],
            path: '/websocket',
        });
    }

    public on<Payload extends object>(event: string, handler: ApiCableHandler<Payload>): ApiCableOff {
        this.socket.on(event, handler);
        return () => this.off(event, handler);
    }

    public off<Payload extends object>(event: string, handler: ApiCableHandler<Payload>): void {
        this.socket.off(event, handler);
    }
}

export default defineNuxtPlugin(() => {
    const { socketUrl } = useRuntimeConfig().public;

    return {
        provide: {
            apiCable: new ApiCable(socketUrl),
        },
    };
});

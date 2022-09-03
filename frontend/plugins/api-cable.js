import { connect } from 'socket.io-client';

class ApiCable {
    constructor({ url, vuex }) {
        this.socket = connect(url);
        this._vuex = vuex;
    }

    on(event, handler) {
        this.socket.on(event, handler);
        return () => this.off(event, handler);
    }

    off(event, handler) {
        this.socket.off(event, handler);
    }

    bindVuexAction(event, action) {
        return this.on(event, (payload) => this._vuex.dispatch(action, payload));
    }
}

export default function (context, inject) {
    inject('apiCable', new ApiCable({
        url: context.env.FRONTEND_SOCKET_URL,
        vuex: context.store
    }));
}

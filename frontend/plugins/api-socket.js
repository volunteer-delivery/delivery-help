export default function (context, inject) {
    const cable = context.$nuxtSocket({});

    function bindVuexCable(event, action) {
        const handler = (payload) => context.store.dispatch(action, payload);
        cable.on(event, handler);
        return () => cable.off(event, handler);
    }

    inject('cable', cable);
    inject('bindVuexCable', bindVuexCable)
}

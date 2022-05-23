export default function (context) {
    const socket = context.$nuxtSocket({});

    socket.on('newRide', async (drive) => {
        await context.store.dispatch('drives-store/add', drive);
    });

    socket.on('updateRide', async (drive) => {
        await context.store.dispatch('drives-store/update', drive);
    });
}

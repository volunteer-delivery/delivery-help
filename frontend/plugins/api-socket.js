export default function (context, inject) {
    const cable = context.$nuxtSocket({});

    cable.on('newRide', async (drive) => {
        await context.store.dispatch('drives-store/add', drive);
    });

    cable.on('updateRide', async (drive) => {
        await context.store.dispatch('drives-store/update', drive);
    });

    inject('cable', cable);
}

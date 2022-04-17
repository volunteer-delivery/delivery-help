export default function(context) {
  if (process.server) return;

  const socket = context.$nuxtSocket({});

  socket.on('newRide', async (drive) => {
    await context.store.dispatch('drives-store/add', drive);
  });

  socket.on('updateRide', async (drive) => {
    await context.store.dispatch('drives-store/update', drive);
  });
}

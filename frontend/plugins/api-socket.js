export default function(context) {
  if (process.server) return;

  const socket = context.$nuxtSocket({});

  socket.on('newRide', (drive) => {
    context.store.commit('drives-store/add', drive);
  });
}

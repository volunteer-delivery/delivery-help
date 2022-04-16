export default function(context) {
  if (process.server) return;

  const socket = context.app.$nuxtSocket({});
}

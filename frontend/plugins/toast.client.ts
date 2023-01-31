import ToastPlugin from 'vue-toast-notification'

export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.use(ToastPlugin);
});

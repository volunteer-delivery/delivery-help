import { RouteLocationNormalized } from 'vue-router';

function isPublicRoute(route: RouteLocationNormalized): boolean {
    return ['/sign-in'].includes(route.path);
}

export default defineNuxtRouteMiddleware((to) => {
    const session = useCookie('dh.session');

    if (isPublicRoute(to)) return;
    if (!session.value) return navigateTo('/sign-in');
});

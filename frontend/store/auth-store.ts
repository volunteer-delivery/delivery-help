import {defineStore} from "pinia";
import {useHttpClient} from "~/composables/use-http-client";

export interface ICredentials {
    username: string;
    password: string;
}

export interface User {
    id: string;
    username: string
}

export const useAuthStore = defineStore('auth', () => {
    const http = useHttpClient();
    const nuxt = useNuxtApp();
    const currentUser = ref<User>(null);

    async function signIn(credentials: ICredentials) {
        await http.post<ICredentials>('auth/sign-in', {
            username: credentials.username,
            password: credentials.password
        });
    }

    async function loadCurrentUser() {
        if (currentUser.value) return;

        currentUser.value = await http.get<User>('user/current');
        nuxt.$errorTracker.setUser(currentUser.value);
    }

    return { currentUser, signIn, loadCurrentUser };
});

import { defineStore } from 'pinia';

export interface ICredentials {
    username: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
}

export const useAuthStore = defineStore('auth', () => {
    const http = useHttpClient();
    const nuxt = useNuxtApp();
    const currentUser = ref<User | null>(null);

    async function signIn(credentials: ICredentials): Promise<void> {
        const response = await http.post<ICredentials, { user: User }>('auth/sign-in', {
            username: credentials.username,
            password: credentials.password,
        });
        currentUser.value = response!.user;
    }

    async function signOut(): Promise<void> {
        await http.post('auth/sign-out');
        location.reload();
    }

    async function loadCurrentUser(): Promise<void> {
        if (currentUser.value) return;

        const { user } = await http.get<{ user: User }>('user/current');

        currentUser.value = user;
        nuxt.$errorTracker.setUser(user);
    }

    return { currentUser, signIn, signOut, loadCurrentUser };
});

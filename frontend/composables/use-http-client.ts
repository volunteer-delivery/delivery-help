import { HttpClient } from '~/plugins/http-client';

export function useHttpClient(): HttpClient {
    return useNuxtApp().$http;
}

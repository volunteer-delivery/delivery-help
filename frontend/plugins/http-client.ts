import type { $Fetch } from 'nitropack';
import type { FetchContext, FetchResponse } from 'ofetch';
import { useNProgress, UseNProgressReturn } from '@vueuse/integrations/useNProgress';

type $FetchErrorContext = FetchContext & { response: FetchResponse<ResponseType> };

export class HttpError extends Error {}

export class HttpClient {
    private readonly fetch: $Fetch;

    constructor(
        baseURL: string,
        private readonly nprogress: UseNProgressReturn,
    ) {
        this.fetch = $fetch.create({
            credentials: 'same-origin',
            baseURL,
            onResponseError: this.onError.bind(this),
            onRequest: () => this.nprogress.start(),
            onResponse: () => this.nprogress.done(),
        });
    }

    private onError(error: $FetchErrorContext): void {
        this.nprogress.done();

        if (!error.response) {
            throw error;
        }
        if (error.response.status === 403) {
            window.location.reload();
        }
        const { message } = error.response._data;
        throw (message ? new HttpError(message) : error);
    }

    public async get<Response extends object>(url: string, params: Record<string, unknown> = {}): Promise<Response> {
        return this.fetch<Response>(url, { method: 'GET', params });
    }

    public async post<Body extends object = {}, Response = null>(url: string, body: Body = {} as Body): Promise<Response | null> {
        return this.fetch<Response>(url, { method: 'POST', body });
    }

    public async patch<Body extends object, Response = null>(url: string, body: Body): Promise<Response | null> {
        return this.fetch<Response>(url, { method: 'PATCH', body });
    }
}

export default defineNuxtPlugin((nuxt) => {
    const { apiUrl } = useRuntimeConfig().public;
    const nprogress = useNProgress(null, { showSpinner: false });

    return {
        provide: {
            http: new HttpClient(`${apiUrl}/v1`, nprogress),
        },
    };
});

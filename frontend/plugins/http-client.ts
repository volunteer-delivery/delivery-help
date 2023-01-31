import type {$Fetch} from "nitropack";
import type {FetchContext, FetchResponse} from "ofetch";

type $FetchErrorContext = FetchContext & { response: FetchResponse<ResponseType> };

class HttpClient {
    private readonly fetch: $Fetch;

    constructor(baseURL: string) {
        this.fetch = $fetch.create({
            credentials: 'same-origin',
            baseURL,
            onResponseError: this.onError.bind(this)
        });
    }

    private onError(error: $FetchErrorContext): void {
        if (error.response?.status === 403) {
            window.location.reload();
        }
    }

    async get<Response extends object>(url: string, params: Record<string, any> = {}): Promise<Response> {
        return this.fetch<Response>(url, { method: 'GET', params });
    }

    async post<Body extends object, Response = null>(url: string, body: Body): Promise<Response | null> {
        return this.fetch<Response>(url, { method: 'POST', body });
    }

    async patch<Body extends object, Response = null>(url: string, body: Body): Promise<Response | null> {
        return this.fetch<Response>(url, { method: 'PATCH', body });
    }
}

export default defineNuxtPlugin((nuxt) => {
    const { apiUrl } = useRuntimeConfig().public;
    return {
        provide: {
            http: new HttpClient(`${apiUrl}/v1`)
        }
    }
});

import type { App, Plugin } from 'vue';
import Bugsnag, { BugsnagStatic } from '@bugsnag/js';
import BugsnagPluginVue from '@bugsnag/plugin-vue';
import type { User } from '~/stores/auth-store';

interface TrackerInitOptions {
    vueApp: App<Element>;
    apiKey: string;
    releaseStage: string;
}

class ErrorTracker {
    public isInitied = false;

    public init({ vueApp, apiKey, releaseStage }: TrackerInitOptions): void {
        Bugsnag.start({
            apiKey,
            releaseStage,
            plugins: [new BugsnagPluginVue()],
        });
        const plugin = Bugsnag.getPlugin('vue') as Plugin;

        vueApp.use(plugin);

        this.isInitied = true;
    }

    private get bugsnag(): BugsnagStatic | null {
        return this.isInitied ? Bugsnag : null;
    }

    public setUser(user: User): void {
        this.bugsnag?.setUser(user.id, undefined, user.username);
    }
}

export default defineNuxtPlugin((nuxt) => {
    const { bugsnagKey, env } = useRuntimeConfig().public;
    const errorTracker = new ErrorTracker();

    bugsnagKey && errorTracker.init({
        vueApp: nuxt.vueApp,
        apiKey: bugsnagKey,
        releaseStage: env,
    });

    return {
        provide: {
            errorTracker,
        },
    };
});

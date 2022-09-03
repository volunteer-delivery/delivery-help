import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

class ErrorTracker {
    isInitied = false;

    init({ apiKey, releaseStage }) {
        Bugsnag.start({
            apiKey,
            releaseStage,
            plugins: [new BugsnagPluginVue()]
        });

        Bugsnag.getPlugin('vue').installVueErrorHandler(Vue)

        this.isInitied = true;
    }

    get _bugsnag() {
        return this.isInitied ? Bugsnag : null;
    }

    setUser(user) {
        this._bugsnag?.setUser(user.id, null, user.name);
    }
}

export default (context, inject) => {
    const { FRONTEND_BUGSNAG_KEY, FRONTEND_ENV } = context.env;
    const errorTracker = new ErrorTracker();

    FRONTEND_BUGSNAG_KEY && errorTracker.init({
        apiKey: FRONTEND_BUGSNAG_KEY,
        releaseStage: FRONTEND_ENV
    });

    inject('errorTracker', errorTracker)
}

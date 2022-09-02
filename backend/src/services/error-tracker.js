const Bugsnag = require('@bugsnag/js');
const BugsnagPluginExpress = require('@bugsnag/plugin-express');

const { BACKEND_BUGSNAG_KEY, BACKEND_ENV } = process.env;

if (BACKEND_BUGSNAG_KEY) {
    Bugsnag.start({
        apiKey: BACKEND_BUGSNAG_KEY,
        releaseStage: BACKEND_ENV,
        plugins: [BugsnagPluginExpress],
        onError: console.log
    });
}

class ErrorTracker {
    _express = this._bugsnag?.getPlugin('express');

    get _bugsnag() {
        return BACKEND_BUGSNAG_KEY ? Bugsnag : null;
    }

    initRequestHandler(app) {
        this._express && app.use(this._express.requestHandler);
    }

    initErrorHandler(app) {
        this._express && app.use(this._express.errorHandler)
    }
}

module.exports = {
    errorTracker: new ErrorTracker()
};

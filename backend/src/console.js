const repl = require('repl');
const mongoose = require('mongoose');
const { readFileSync, writeFileSync, existsSync } = require('fs');

const HISTORY_LOCATION = '/app-tmp/delivery-help-console-history';

function loadHistory() {
    if (!existsSync(HISTORY_LOCATION)) return '';

    const historyContent = readFileSync(HISTORY_LOCATION, { encoding: 'utf8' });

    return historyContent
        .split('\n')
        .filter((command) => command !== '.exit')
        .slice(0, 100)
        .join('\n');
}

function setupHistory(replServer) {
    writeFileSync(HISTORY_LOCATION, loadHistory());
    replServer.setupHistory(HISTORY_LOCATION, () => {});
}

(async () => {
    await mongoose.connect(process.env.MONGO_URL);

    global.app = {
        mongoose,
        ...require('./models'),
        ...require('./services')
    };

    const replServer = repl.start();

    setupHistory(replServer);

    replServer.on('exit', () => mongoose.disconnect());
})();


const repl = require('repl');
const mongoose = require('mongoose');
const { readFileSync, writeFileSync, existsSync } = require('fs');

(async () => {
    await mongoose.connect(process.env.MONGO_URL);

    global.deliveryHelp = {
        mongoose,
        ...require('./models'),
        ...require('./services')
    };

    const replServer = repl.start();
    const historyLocation = '/tmp/delivery-help-console-history';

    const historyContent = !existsSync(historyLocation) ? '' : readFileSync(historyLocation, { encoding: 'utf8' });
    const history = historyContent.split('\n').filter((command) => command !== '.exit').join('\n');

    writeFileSync(historyLocation, history);

    replServer.setupHistory(historyLocation, () => {});
    replServer.on('exit', () => mongoose.disconnect());
})();


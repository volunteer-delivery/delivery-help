import {start, REPLServer} from 'repl';
import {readFileSync, writeFileSync, existsSync} from 'fs';
import {NestFactory} from "@nestjs/core";
import {ConsoleModule} from './console.module';
import {repositories, DatabaseConnection} from "./modules/database";

const HISTORY_LOCATION = '/app-tmp/delivery-help-console-history';

function loadHistory(): string {
    if (!existsSync(HISTORY_LOCATION)) return '';

    const historyContent = readFileSync(HISTORY_LOCATION, { encoding: 'utf8' });

    return historyContent
        .split('\n')
        .filter((command) => command !== '.exit')
        .slice(0, 100)
        .join('\n');
}

function setupHistory(replServer: REPLServer): void {
    writeFileSync(HISTORY_LOCATION, loadHistory());
    replServer.setupHistory(HISTORY_LOCATION, () => {});
}

(async () => {
    const app = await NestFactory.createApplicationContext(ConsoleModule);

    global.db = {};

    for (const Repository of repositories) {
        const {name, query} = app.get(Repository);
        global.db[name] = query;
    }

    const replServer = start();

    setupHistory(replServer);

    replServer.on('exit', () => app.get(DatabaseConnection).disconnect());
})();


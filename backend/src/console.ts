import {start, REPLServer} from 'repl';
import {readFileSync, writeFileSync, existsSync} from 'fs';
import {NestFactory} from "@nestjs/core";
import {ConsoleModule} from './console.module';
import {repositories} from "./modules/database";
import {INestApplicationContext} from "@nestjs/common";

const HISTORY_LOCATION = '/app-tmp/delivery-help-console-history';

class Console {
    private applicationContext: INestApplicationContext;
    private replServer: REPLServer;

    async start(): Promise<void> {
        this.applicationContext = await NestFactory.createApplicationContext(ConsoleModule);
        this.initDatabase();
        this.replServer = start();
        this.setupHistory()
        this.replServer.on('exit', this.onExit.bind(this));
    }

    private initDatabase(): void {
        global.db = {};

        for (const Repository of repositories) {
            const {name, query} = this.applicationContext.get(Repository);
            const queryName = name[0].toLowerCase() + name.slice(1);
            global.db[queryName] = query;
        }
    }

    private setupHistory(): void {
        writeFileSync(HISTORY_LOCATION, this.loadHistory());
        this.replServer.setupHistory(HISTORY_LOCATION, () => {});
    }

    private loadHistory(): string {
        if (!existsSync(HISTORY_LOCATION)) return '';

        const historyContent = readFileSync(HISTORY_LOCATION, { encoding: 'utf8' });

        return historyContent
            .split('\n')
            .filter((command) => command !== '.exit')
            .slice(0, 100)
            .join('\n');
    }

    private async onExit(): Promise<void> {
        await this.applicationContext.close();
    }
}

new Console().start();

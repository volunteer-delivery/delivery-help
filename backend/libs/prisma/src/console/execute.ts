import { start, REPLServer } from 'repl';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { PrismaClient } from '../client';

const HISTORY_LOCATION = '/app-tmp/delivery-help-console-history';

class Execute {
    private replServer: REPLServer;

    public async start(): Promise<void> {
        global.db = new PrismaClient();
        this.replServer = start();
        this.setupHistory();
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
}

new Execute().start();

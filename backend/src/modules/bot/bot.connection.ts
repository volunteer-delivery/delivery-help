import {Injectable} from "@nestjs/common";
import {Context, Telegraf, Types} from "telegraf";
import {IInlineMiddleware, IMiddleware} from "./base";

type OnHandlers = [IInlineMiddleware, ...IInlineMiddleware[]];

export interface IHandleBotError {
    catch(error: Error, context: Context): void | Promise<void>;
}

@Injectable()
export class BotConnection {
    private bot: Telegraf;

    create(token): void {
        this.bot = new Telegraf<Context>(token);
    }

    use(middleware: IMiddleware): void;
    use(middlewares: IMiddleware[]): void;
    use(input: IMiddleware | IMiddleware[]): void {
        const middlewares = Array.isArray(input) ? input : [input];
        for (const middleware of middlewares) this.bot.use(middleware);
    }

    onError(errorHandler: IHandleBotError): void {
        this.bot.catch(errorHandler.catch.bind(errorHandler));
    }

    onStart(middleware: IMiddleware): void {
        this.bot.start(middleware);
    }

    hears(text: string, handler: IMiddleware): void {
        this.bot.hears(text, handler);
    }

    on(event: Types.UpdateType | Types.MessageSubType, ...handlers: OnHandlers): void {
        this.bot.on(event, ...handlers);
    }

    async sendMessage(chatId: string, message: string) {
        await this.bot.telegram.sendMessage(chatId, message)
    }

    async launch(): Promise<void> {
        await this.bot.launch();
    }
}

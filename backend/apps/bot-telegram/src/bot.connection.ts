import { Injectable } from '@nestjs/common';
import { Context, Telegraf, Types } from 'telegraf';
import { IInlineMiddleware, IMiddleware } from './base';

type OnHandlers = [IInlineMiddleware, ...IInlineMiddleware[]];

export interface IHandleBotError {
    catch(error: Error, context: Context): void | Promise<void>;
}

@Injectable()
export class BotConnection {
    private bot: Telegraf;

    public create(token): void {
        this.bot = new Telegraf<Context>(token);
    }

    public use(middleware: IMiddleware): void;
    public use(middlewares: IMiddleware[]): void;
    public use(input: IMiddleware | IMiddleware[]): void {
        const middlewares = Array.isArray(input) ? input : [input];
        for (const middleware of middlewares) this.bot.use(middleware);
    }

    public onError(errorHandler: IHandleBotError): void {
        this.bot.catch(errorHandler.catch.bind(errorHandler));
    }

    public onStart(middleware: IMiddleware): void {
        this.bot.start(middleware);
    }

    public hears(text: string, handler: IMiddleware): void {
        this.bot.hears(text, handler);
    }

    public on(event: Types.UpdateType | Types.MessageSubType, ...handlers: OnHandlers): void {
        this.bot.on(event, ...handlers);
    }

    public async sendMessage(chatId: string, message: string): Promise<void> {
        await this.bot.telegram.sendMessage(chatId, message);
    }

    public async launch(): Promise<void> {
        await this.bot.launch();
    }
}

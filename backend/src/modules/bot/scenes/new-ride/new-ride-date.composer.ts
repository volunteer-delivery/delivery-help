import {Injectable} from "@nestjs/common";
import {Markup} from "telegraf";
import {BaseComposer, IComposeActionHandler, IComposeHandler, IComposeMatchedContext} from "../../base";
import {INewRideContext} from "./new-ride.context";

const daysOfWeek = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

@Injectable()
export class NewRideDateComposer extends BaseComposer {
    protected defineActions(): Partial<Record<string, IComposeHandler | IComposeActionHandler>> {
        return {
            PREV_DATE_RANGE: this.showPrevDateRange,
            NEXT_DATE_RANGE: this.showNextDateRange,
            'PICK_DATE_[\d-]+': { handler: this.pickDate, pattern: true }
        }
    }

    private async showPrevDateRange(context: INewRideContext): Promise<void> {
        await context.deleteMessage();
        const { datePickerFirstDate } = context.scene.state;
        datePickerFirstDate.setDate(datePickerFirstDate.getDate() - 6);
        await this.showDatePicker(context);
    }

    private async showNextDateRange(context: INewRideContext): Promise<void> {
        await context.deleteMessage();
        const { datePickerFirstDate } = context.scene.state;
        datePickerFirstDate.setDate(datePickerFirstDate.getDate() + 6);
        await this.showDatePicker(context);
    }

    private async pickDate(context: INewRideContext & IComposeMatchedContext): Promise<void> {
        await context.deleteMessage();
        const date = context.match[0].replace("PICK_DATE_", "");
        context.scene.state.departureTime = date;
        await context.reply(`Ви вказали, що ваша поїздка розпочнеться ${date}`);

        await context.reply(
            'Оберіть габарити вашого транспортного засобу:',
            Markup.inlineKeyboard([
                [Markup.button.callback('Легковий автомобіль ( < 2т)', 'SET_CAR')],
                [Markup.button.callback('Вантажний автомобіль ( < 10т)', 'SET_VAN')],
                [Markup.button.callback('Фура ( > 10т)', 'SET_TRUCK')]
            ])
        );
        await context.wizard.next();
    }

    async showDatePicker(context: INewRideContext): Promise<void> {
        const keyBoard = [];
        const date = new Date(context.scene.state.datePickerFirstDate);

        if (date > context.scene.state.datePickerToday) {
            keyBoard.push([{text: 'Попередні дати', callback_data: 'PREV_DATE_RANGE'}]);
        }

        for (let i = 0; i < 3; i++) {
            const keyBoardRow = [];

            for (let j = 0; j < 2; j++) {
                const dateStr = date.toISOString().slice(0, 10);

                keyBoardRow.push({
                    text: `${dateStr} ${daysOfWeek[date.getDay()]}`,
                    callback_data: `PICK_DATE_${dateStr}`
                });

                date.setDate(date.getDate() + 1);
            }
            keyBoard.push(keyBoardRow);
        }

        keyBoard.push([{text: 'Наступні дати', callback_data: 'NEXT_DATE_RANGE'}]);

        await context.reply(
            'Оберіть варіант дати, коли ви розпочинаєте поїздку:',
            Markup.inlineKeyboard(keyBoard)
        );
    }
}

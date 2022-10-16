import {Injectable} from "@nestjs/common";
import {Markup} from "telegraf";
import {BaseWizardScene, ISceneDefinition, IWizardSceneContext} from "../../base";
import {NewDriverContactComposer} from "./new-driver-contact.composer";

@Injectable()
export class NewDriverScene extends BaseWizardScene {
    id = 'new-driver-wizard';

    defineSteps(): ISceneDefinition<IWizardSceneContext>[] {
        return [
            this.shareContactStep,
            NewDriverContactComposer
        ];
    }

    private async shareContactStep(context: IWizardSceneContext): Promise<void> {
        await context.reply(
            '⬇️ Натисніть кнопку "Відправити свої контактні дані", щоби поділитися ' +
            'ними із волонтерами, яким потрібна допомога. Надана інформація ' +
            'безпечно зберігається у волонтерській базі.',
            Markup.keyboard([
                Markup.button.contactRequest('Відправити свої контактні дані')
            ]).oneTime()
        )
        await context.wizard.next();
    }
}

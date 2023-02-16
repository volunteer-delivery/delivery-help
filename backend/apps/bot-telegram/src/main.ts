import { MicroserviceApplicationAdapter, MicroserviceStarter } from '@app/core/microservices';
import { PrismaExtension } from '@app/core/microservices/extensions/prisma-extension';
import { BotModule } from './bot.module';

MicroserviceStarter.run({
    name: 'BOT_TELEGRAM',
    applicationAdapter: new MicroserviceApplicationAdapter(BotModule),
    extensions: [new PrismaExtension()],
});

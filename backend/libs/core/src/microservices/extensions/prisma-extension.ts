import { PrismaService } from '@app/prisma';
import { INestApplicationContext } from '@nestjs/common';
import { StarterExtension } from './starter-extension';

export class PrismaExtension extends StarterExtension<INestApplicationContext> {
    public async beforeStart(): Promise<void> {
        const prisma = this.app.get(PrismaService);
        await prisma.enableShutdownHooks(this.app);
    }
}

import { Global, Module } from '@nestjs/common';
import { EnvironmentModule } from '@app/core/environment';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    imports: [EnvironmentModule],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}

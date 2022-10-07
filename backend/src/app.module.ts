import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./modules/auth";
import {DatabaseModule} from "./modules/database";

@Module({
  imports: [
      AuthModule,
      ConfigModule.forRoot({
          ignoreEnvFile: true,
          isGlobal: true
      }),
      DatabaseModule.forRoot()
  ]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./modules/auth";
import {DatabaseModule} from "./modules/database";
import {UserModule} from "./modules/user";

@Module({
  imports: [
      ConfigModule.forRoot({
          ignoreEnvFile: true,
          isGlobal: true
      }),
      DatabaseModule.forRoot(),
      AuthModule,
      UserModule
  ]
})
export class AppModule {}

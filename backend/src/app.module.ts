import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./modules/auth";

@Module({
  imports: [
      AuthModule,
      ConfigModule.forRoot({
          ignoreEnvFile: true,
          isGlobal: true
      })
  ]
})
export class AppModule {}

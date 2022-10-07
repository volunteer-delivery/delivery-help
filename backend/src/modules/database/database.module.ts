import {Module, OnModuleInit} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import mongoose from 'mongoose';
import {UserRepository} from "./repository";

const repositories = [
    UserRepository
];

@Module({
    providers: repositories,
    exports: repositories
})
export class DatabaseModule implements OnModuleInit {
    constructor(private readonly configService: ConfigService) {}

    async onModuleInit(): Promise<void> {
        const url = this.configService.getOrThrow('MONGO_URL');
        await mongoose.connect(url);
    }
}

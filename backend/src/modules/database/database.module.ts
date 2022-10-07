import {DynamicModule, OnModuleInit} from "@nestjs/common";
import mongoose from 'mongoose';
import {AdressRepository, DriverRepository, RideCommentRepository, RideRepository, UserRepository} from "./repository";

const repositories = [
    UserRepository,
    AdressRepository,
    DriverRepository,
    RideCommentRepository,
    RideRepository
];

export class DatabaseModule implements OnModuleInit {
    static forRoot = (): DynamicModule => ({
        global: true,
        module: DatabaseModule,
        providers: repositories,
        exports: repositories
    })

    async onModuleInit(): Promise<void> {
        // Cannot access to global module in onModuleInit
        await mongoose.connect(process.env.MONGO_URL);
    }
}

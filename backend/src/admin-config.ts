import AdminJS, {AdminJSOptions} from "adminjs";
import AdminJSPrisma from "@adminjs/prisma";
import { AddressResource, UserResource, RideResource, DriverResource } from './modules/admin';
import {PrismaClient} from "./modules/prisma";

const prismaClient = new PrismaClient();
AdminJS.registerAdapter(AdminJSPrisma);

const resources = [
    AddressResource,
    UserResource,
    RideResource,
    DriverResource
];

export const config: AdminJSOptions = {
    rootPath: '/admin',
    branding: {
        companyName: 'Волонтер Вантаж ~ Адмін',
        favicon: '/favicon.ico'
    },
    resources: resources.map((Resource) => new Resource(prismaClient).build())
};

export default config;

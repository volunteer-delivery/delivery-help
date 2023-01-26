import {Driver} from "@app/prisma";
import {Exclude} from "class-transformer";

export class DriverResponse implements Driver {
    id: string;
    name: string;
    phone: string;

    @Exclude()
    telegramId: string | null;

    constructor(driver: Driver) {
        Object.assign(this, driver)
    }
}

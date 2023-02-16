import { Driver } from '@app/prisma';
import { Exclude } from 'class-transformer';

export class DriverResponse implements Driver {
    public id: string;
    public name: string;
    public phone: string;

    @Exclude()
    public telegramId: string | null;

    constructor(driver: Driver) {
        Object.assign(this, driver);
    }
}

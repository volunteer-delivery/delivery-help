import {Controller, Get} from "@nestjs/common";
import {DriverRepository, IDriverModel} from "../database";

@Controller('drivers')
export class DriverController {
    constructor(
        private readonly driverRespository: DriverRepository
    ) {}

    @Get()
    async getDrivers(): Promise<{drivers: IDriverModel[]}> {
        const drivers = await this.driverRespository.query.find({}).exec();
        return {drivers};
    }
}

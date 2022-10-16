import {Controller, Get, Inject} from "@nestjs/common";
import {DriverRepository, IDriverModel} from "../database";

@Controller('drivers')
export class DriverController {
    @Inject()
    private driverRespository: DriverRepository

    @Get()
    async getDrivers(): Promise<{drivers: IDriverModel[]}> {
        const drivers = await this.driverRespository.query.find({}).exec();
        return {drivers};
    }
}

import {Controller, Get} from "@nestjs/common";
import {IRideModel, IUserModel, RideRepository} from "../database";
import {CurrentUser} from "../auth";

@Controller('rides')
export class RideController {
    constructor(
        private readonly rideRepository: RideRepository
    ) {}

    @Get()
    async getRides(@CurrentUser() user: IUserModel): Promise<{ rides: IRideModel[] }> {
        const rides = await this.rideRepository.find({volunteer: [null, user.id]}).populate('driver').exec();
        return {rides};
    }
}
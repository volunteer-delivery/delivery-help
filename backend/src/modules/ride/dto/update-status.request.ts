import {IsEnum} from "class-validator";
import {RideStatus} from "../../prisma";

export class UpdateStatusRequest {
    @IsEnum(RideStatus)
    status: RideStatus;
}

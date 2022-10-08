import {RideStatus} from "../../database";
import {IsEnum} from "class-validator";

export class UpdateStatusRequest {
    @IsEnum(RideStatus)
    status: RideStatus;
}

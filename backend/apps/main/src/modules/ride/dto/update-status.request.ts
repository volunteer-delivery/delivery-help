import {IsEnum} from "class-validator";
import {RideStatus} from "@app/prisma";

export class UpdateStatusRequest {
    @IsEnum(RideStatus)
    status: RideStatus;
}

import {Address, Driver, Ride, RideStatus, Vehicle} from "../../prisma";
import {Exclude} from "class-transformer";
import {DriverResponse} from "../../driver";

export interface RideResponseAttrs extends Ride {
    driver: Driver;
    from: Address;
    destination: Address;
}

export class RideResponse implements RideResponseAttrs {
    id: string;
    departureTime: Date;
    status: RideStatus;
    vehicle: Vehicle;

    @Exclude()
    driverId: string;
    driver: Driver;

    @Exclude()
    fromId: string;
    from: Address;

    @Exclude()
    destinationId: string;
    destination: Address;

    @Exclude()
    volunteerId: string | null;

    constructor(ride: RideResponseAttrs) {
        Object.assign(this, ride);
        this.driver = new DriverResponse(ride.driver)
    }
}

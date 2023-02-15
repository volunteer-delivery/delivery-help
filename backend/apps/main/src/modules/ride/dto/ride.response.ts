import {Address, Driver, Ride, RideStatus, Vehicle} from "@app/prisma";
import {Exclude, Expose} from "class-transformer";
import {DriverResponse} from "../../driver";

export interface RideResponseAttrs extends Ride {
    driver: Driver;
    from: Address;
    destination: Address;
}

export interface RidePathPoint {
    address: Address;
    departureTime?: Date;
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

    @Expose()
    get path(): RidePathPoint[] {
        return [
            {
                address: this.from,
                departureTime: this.departureTime
            },
            {
                address: this.destination
            }
        ];
    }
}

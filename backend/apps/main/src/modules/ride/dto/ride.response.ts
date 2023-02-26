import { Address, Driver, Ride, RideStatus, Vehicle } from '@app/prisma';
import { Exclude, Expose } from 'class-transformer';
import { DriverResponse } from '../../driver';

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
    public id: string;
    public departureTime: Date;
    public status: RideStatus;
    public vehicle: Vehicle;

    @Exclude()
    public driverId: string;

    public driver: Driver;

    @Exclude()
    public fromId: string;

    public from: Address;

    @Exclude()
    public destinationId: string;

    public destination: Address;

    @Exclude()
    public volunteerId: string | null;

    constructor(ride: RideResponseAttrs) {
        Object.assign(this, ride);
        this.driver = new DriverResponse(ride.driver);
    }

    @Expose()
    public get path(): RidePathPoint[] {
        return [
            {
                address: this.from,
                departureTime: this.departureTime,
            },
            {
                address: this.destination,
            },
        ];
    }
}

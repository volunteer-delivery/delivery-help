import { RideResponse, RideResponseAttrs } from './ride.response';

export class RideListResponse {
    public rides: RideResponse[];

    constructor(rides: RideResponseAttrs[]) {
        this.rides = rides.map((ride) => new RideResponse(ride));
    }
}

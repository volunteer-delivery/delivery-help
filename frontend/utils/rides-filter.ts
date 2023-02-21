import { Vehicle } from '~/enums';
import type { Ride } from '~/stores/rides-store';
import { Filter } from './filter';

export class RidesFilter extends Filter<Ride> {
    public static create(input: Ride[]): RidesFilter {
        return new RidesFilter(input);
    }

    public byFromCountry(country: string | null): RidesFilter {
        return this.addCriteria(!!country, (ride) => ride.path[0].address.country === country);
    }

    public byFromCity(city: string | null): RidesFilter {
        return this.addCriteria(!!city, (ride) => ride.path[0].address.city === city);
    }

    public byDestinationCity(city: string | null): RidesFilter {
        return this.addCriteria(!!city, (ride) => ride.path.slice().pop()!.address.city === city);
    }

    public byVehicles(vehicles: Vehicle[]): RidesFilter {
        return this.addCriteria(!!vehicles.length, (ride) => vehicles.includes(ride.vehicle));
    }

    public byDepartureRange(range: [Date?, Date?]): RidesFilter {
        return this.addCriteria(range.length === 2, (ride): boolean => {
            const departureTime = Number(new Date(ride.path[0].departureTime!));
            return departureTime > Number(range[0]) && departureTime < Number(range[1]);
        });
    }
}

import { defineStore } from 'pinia';
import { RideStatus, Vehicle } from '~/enums';

export interface Address {
    country: string;
    city?: string;
}

export interface Driver {
    id: string;
    phone: string;
}

export interface RidePathPoint {
    address: Address;
    departureTime?: string;
}

export type RidePath = RidePathPoint[];

export interface Ride {
    id: string;
    status: RideStatus;
    destination: Address;
    vehicle: Vehicle;
    driver: Driver;
    path: RidePathPoint[];
}

export const useRideDetailsStore = defineStore('ride-details', () => {
    const http = useHttpClient();
    const ridesStore = useRidesStore();

    const ride = ref<Ride | null>(null);

    function load(rideId: string): Ride {
        ride.value = ridesStore.rides.find((ride) => ride.id === rideId) || null;
        return ride.value!;
    }

    return { ride, load };
});

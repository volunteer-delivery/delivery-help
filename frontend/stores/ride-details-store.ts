import { defineStore } from 'pinia';
import { RideStatus, Vehicle } from '~/enums';
import type { User } from '~/stores/auth-store';
import type { ApiCableOff } from '~/plugins/api-cable.client';

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

export interface RideComment {
    id: string;
    createdAt: string;
    text: string;
    author: User;
}

export const useRideDetailsStore = defineStore('ride-details', () => {
    const http = useHttpClient();
    const apiCable = useApiCable();
    const ridesStore = useRidesStore();

    const ride = ref<Ride | null>(null);
    const comments = ref<RideComment[]>([]);
    let offCommentsCable: ApiCableOff;

    function load(rideId: string): Ride {
        ride.value = ridesStore.rides.find((ride) => ride.id === rideId) || null;
        return ride.value!;
    }

    async function loadComments(): Promise<RideComment[]> {
        const response = await http.get<{ comments: RideComment[] }>(`/rides/${ride.value!.id}/comments`);
        comments.value = response.comments;

        offCommentsCable = apiCable.on<RideComment>(`rides/${ride.value!.id}/comments/new`, (comment) => {
            comments.value.unshift(comment);
        });

        return comments.value;
    }

    async function sendComment(text: string): Promise<void> {
        await http.post(`/rides/${ride.value!.id}/comments`, { text });
    }

    function off(): void {
        ride.value = null;
        offCommentsCable?.();
    }

    return { ride, load, loadComments, sendComment, off };
});

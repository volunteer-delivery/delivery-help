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

export interface IRidesFilter {
    fromCountry: string | null;
    fromCity: string | null;
    destinationCity: string | null;
    vehicles: Vehicle[];
    departureRange: [Date?, Date?];
}

export interface RidesFilterValues {
    countries: Set<string>;
    cities: Set<string>;
}

const format = (value: number): string => value > 100 ? '100+' : value.toString();

export const useRidesStore = defineStore('rides', () => {
    const http = useHttpClient();
    const toastStore = useToastStore();

    const rides = ref<Ride[]>([]);
    const isLoaded = ref(false);

    const filterValues = reactive<RidesFilterValues>({
        countries: new Set(),
        cities: new Set(),
    });

    const pendingFilter = reactive<IRidesFilter>({
        fromCountry: '',
        fromCity: '',
        destinationCity: '',
        vehicles: [],
        departureRange: [],
    });

    const pending = computed(() => rides.value.filter((ride: Ride) => ride.status === RideStatus.PENDING));
    const active = computed(() => rides.value.filter((ride: Ride) => ride.status === RideStatus.ACTIVE));
    const done = computed(() => rides.value.filter((ride: Ride) => ride.status === RideStatus.FINISHED));

    const counter = computed(() => ({
        pending: format(pending.value.length),
        active: format(active.value.length),
        done: format(done.value.length),
    }));

    const pendingFiltered = computed(() => {
        return RidesFilter.create(pending.value)
            .byFromCountry(pendingFilter.fromCountry)
            .byFromCity(pendingFilter.fromCity)
            .byDestinationCity(pendingFilter.destinationCity)
            .byVehicles(pendingFilter.vehicles)
            .byDepartureRange(pendingFilter.departureRange)
            .apply();
    });

    function patchFilterValues(ride: Ride): void {
        for (const point of ride.path) {
            filterValues.countries.add(point.address.country!);
            if (point.address.city) filterValues.cities.add(point.address.city);
        }
    }

    async function load(): Promise<void> {
        if (isLoaded.value) return;

        const { rides: data } = await http.get<{ rides: Ride[] }>('rides');
        rides.value = data;

        for (const ride of rides.value) {
            patchFilterValues(ride);
        }

        isLoaded.value = true;
    }

    function add(ride: Ride): void {
        patchFilterValues(ride);
        rides.value.push(ride);
    }

    function update(ride: Ride): void {
        patchFilterValues(ride);
        const index = rides.value.findIndex((d: Ride) => d.id === ride.id);
        rides.value[index] = ride;
    }

    function loadRidesByDriver(driver: Driver): Ride[] {
        return rides.value.filter((ride: Ride) => ride.driver.id === driver.id);
    }

    async function changeStatus(ride: Ride, status: RideStatus): Promise<void> {
        if (!confirm('Ви впевнені що хочете змінити статус заявки?')) return;

        await http.patch(`rides/${ride.id}/status`, { status });
        toastStore.open('Статус змінено').closeAfter(3000);
    }

    function applyPendingFilter(filter: IRidesFilter): void {
        Object.assign(pendingFilter, filter);
    }

    return {
        rides,
        isLoaded,
        active,
        done,
        filterValues,
        pendingFilter,
        pendingFiltered,
        counter,
        load,
        add,
        update,
        loadRidesByDriver,
        changeStatus,
        applyPendingFilter,
    };
});

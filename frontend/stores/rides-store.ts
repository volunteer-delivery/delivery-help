import {RideStatus, Vehicle} from "~/enums";
import {defineStore} from "pinia";

export interface Address {
    country?: string;
    city: string;
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

interface RidesFilter {
    fromCountry: string | null;
    fromCity: string | null;
    destinationCity: string | null;
    vehicles: Vehicle[];
    departureRange: [string?, string?];
}

interface RidesFilterValues {
    countries: Set<string>;
    cities: Set<string>;
}

const format = (value: number) => value > 100 ? `100+` : value.toString();

export const useRidesStore = defineStore('rides', () => {
    const http = useHttpClient();
    const toastStore = useToastStore();

    const rides = ref<Ride[]>([]);
    const isLoaded = ref(false);

    const filterValues = reactive<RidesFilterValues>({
        countries: new Set(),
        cities: new Set()
    });

    const pendingFilter = reactive<RidesFilter>({
        fromCountry: null,
        fromCity: null,
        destinationCity: null,
        vehicles: [],
        departureRange: []
    });

    const pending = computed(() => rides.value.filter((ride: Ride) => ride.status === RideStatus.PENDING));
    const active = computed(() => rides.value.filter((ride: Ride) => ride.status === RideStatus.ACTIVE));
    const done = computed(() => rides.value.filter((ride: Ride) => ride.status === RideStatus.FINISHED));

    const counter = computed(() => ({
        pending: format(pending.value.length),
        active: format(active.value.length),
        done: format(done.value.length)
    }));

    const pendingFiltered = computed(() => {
        return pending.value.filter((ride: Ride) => {
            const [from, destination] = ride.path;

            if (pendingFilter.fromCountry && pendingFilter.fromCountry !== from.address.country) return false;
            if (pendingFilter.fromCity && pendingFilter.fromCity !== from.address.city) return false;
            if (pendingFilter.destinationCity && pendingFilter.destinationCity !== destination.address.city) return false;
            if (pendingFilter.vehicles.length && !pendingFilter.vehicles.includes(ride.vehicle)) return false;

            if (pendingFilter.departureRange.length) {
                const departureTime = Number(new Date(from.departureTime!));
                const [fromDate, toDate] = pendingFilter.departureRange;

                if (departureTime < Number(new Date(fromDate!))) return false;
                if (departureTime > Number(new Date(toDate!))) return false;
            }

            return true;
        });
    });

    function patchFilterValues(ride: Ride) {
        for (const point of ride.path) {
            filterValues.countries.add(point.address.country!);
            if (point.address.city) filterValues.cities.add(point.address.city);
        }
    }

    async function load() {
        if (isLoaded.value) return;

        const { rides: data } = await http.get<{ rides: Ride[] }>('rides');
        rides.value = data;

        for (const ride of rides.value) {
            patchFilterValues(ride);
        }

        isLoaded.value = true;
    }

    function add(ride: Ride) {
        patchFilterValues(ride);
        rides.value.push(ride);
    }

    function update(ride: Ride) {
        patchFilterValues(ride);
        const index = rides.value.findIndex((d: Ride) => d.id === ride.id);
        rides.value[index] = ride;
    }

    function loadRidesByDriver(driver: Driver) {
        return rides.value.filter((ride: Ride) => ride.driver.id === driver.id);
    }

    async function changeStatus(ride: Ride, status: RideStatus) {
        if (!confirm('Ви впевнені що хочете змінити статус заявки?')) return;

        await http.patch(`rides/${ride.id}/status`, { status });
        toastStore.open('Статус змінено').closeAfter(3000);
    }

    function applyPendingFilter(filter: RidesFilter) {
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
        applyPendingFilter
    };
});

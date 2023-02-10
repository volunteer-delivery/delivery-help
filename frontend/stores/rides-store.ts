import {RideStatus, Vehicle} from "~/enums";
import {defineStore} from "pinia";

export interface Address {
    country?: string;
    city: string;
}

export interface Driver {
    id: string;
}

export interface Ride {
    id: string;
    status: RideStatus;
    from: Address;
    destination: Address;
    vehicle: Vehicle;
    departureTime: string;
    driver: Driver;
}

interface RidesFilter {
    fromCountry: string | null;
    fromCity: string | null;
    destinationCity: string | null;
    vehicles: Vehicle[];
    departureRange: [string?, string?];
}

interface RidesFilterValues {
    countries: string[];
    cities: string[];
}

export const useRidesStore = defineStore('rides', () => {
    const http = useHttpClient();
    const toastStore = useToastStore();

    const rides = ref<Ride[]>([]);
    const isLoaded = ref(false);
    const filterValues = ref<RidesFilterValues | null>(null);

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

    const counter = computed(() => {
        const format = (value: number) => value > 100 ? `100+` : value.toString();

        return {
            pending: format(pending.value.length),
            active: format(active.value.length),
            done: format(done.value.length)
        };
    });

    const pendingFiltered = computed(() => {
        return pending.value.filter((ride: Ride) => {
            if (pendingFilter.fromCountry && pendingFilter.fromCountry !== ride.from.country) return false;
            if (pendingFilter.fromCity && pendingFilter.fromCity !== ride.from.city) return false;
            if (pendingFilter.destinationCity && pendingFilter.destinationCity !== ride.destination.city) return false;
            if (pendingFilter.vehicles.length && !pendingFilter.vehicles.includes(ride.vehicle)) return false;

            if (pendingFilter.departureRange.length) {
                const departureTime = Number(new Date(ride.departureTime));
                const [from, to] = pendingFilter.departureRange;

                if (departureTime < Number(new Date(from!))) return false;
                if (departureTime > Number(new Date(to!))) return false;
            }

            return true;
        });
    });

    async function load() {
        if (isLoaded.value) return;

        const filter: Record<keyof RidesFilterValues, Set<string>> = {
            countries: new Set(),
            cities: new Set()
        };

        const { rides: data } = await http.get<{ rides: Ride[] }>('rides');
        rides.value = data;

        for (const ride of rides.value) {
            filter.countries.add(ride.from.country!);
            if (ride.from.city) filter.cities.add(ride.from.city);
            filter.cities.add(ride.destination.city);
        }

        filterValues.value = {
            countries: Array.from(filter.countries),
            cities: Array.from(filter.cities)
        };

        isLoaded.value = true;
    }

    function patchFilterValues(ride: Ride) {
        if (!filterValues.value!.countries.includes(ride.from.country!)) {
            filterValues.value!.countries.push(ride.from.country!);
        }
        if (
            ride.from.city && !filterValues.value!.cities.includes(ride.from.city)
            && !filterValues.value!.cities.includes(ride.destination.city)
        ) {
            filterValues.value!.cities.push(ride.from.country!);
        }
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

    async function loadRidesByDriver(driver: Driver) {
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

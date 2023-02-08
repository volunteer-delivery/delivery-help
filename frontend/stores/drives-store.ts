import {DriveStatus, Vehicle} from "~/enums";
import {defineStore} from "pinia";
// import {useToast} from "vue-toast-notification";

export interface Address {
    country?: string;
    city: string;
}

export interface Driver {
    id: string;
}

export interface Drive {
    id: string;
    status: DriveStatus;
    from: Address;
    destination: Address;
    vehicle: Vehicle;
    departureTime: string;
    driver: Driver;
}

interface DrivesFilter {
    fromCountry: string | null;
    fromCity: string | null;
    destinationCity: string | null;
    vehicles: Vehicle[];
    departureRange: [string?, string?];
}

interface DrivesFilterValues {
    countries: string[];
    cities: string[];
}

export const useDrivesStore = defineStore('drives', () => {
    const http = useHttpClient();
    // const toast = useToast();

    const drives = ref<Drive[]>([]);
    const isLoaded = ref(false);
    const filterValues = ref<DrivesFilterValues | null>(null);

    const pendingFilter = reactive<DrivesFilter>({
        fromCountry: null,
        fromCity: null,
        destinationCity: null,
        vehicles: [],
        departureRange: []
    });

    const pending = computed(() => drives.value.filter((drive: Drive) => drive.status === DriveStatus.PENDING));
    const active = computed(() => drives.value.filter((drive: Drive) => drive.status === DriveStatus.ACTIVE));
    const done = computed(() => drives.value.filter((drive: Drive) => drive.status === DriveStatus.FINISHED));

    const counter = computed(() => {
        const format = (value: number) => value > 100 ? `100+` : value;

        return {
            pending: format(pending.value.length),
            active: format(active.value.length),
            done: format(done.value.length)
        };
    });

    const pendingFiltered = computed(() => {
        return pending.value.filter((drive: Drive) => {
            if (pendingFilter.fromCountry && pendingFilter.fromCountry !== drive.from.country) return false;
            if (pendingFilter.fromCity && pendingFilter.fromCity !== drive.from.city) return false;
            if (pendingFilter.destinationCity && pendingFilter.destinationCity !== drive.destination.city) return false;
            if (pendingFilter.vehicles.length && !pendingFilter.vehicles.includes(drive.vehicle)) return false;

            if (pendingFilter.departureRange.length) {
                const departureTime = Number(new Date(drive.departureTime));
                const [from, to] = pendingFilter.departureRange;

                if (departureTime < Number(new Date(from!))) return false;
                if (departureTime > Number(new Date(to!))) return false;
            }

            return true;
        });
    });

    async function load() {
        if (isLoaded.value) return;

        const filter: Record<keyof DrivesFilterValues, Set<string>> = {
            countries: new Set(),
            cities: new Set()
        };

        drives.value = await http.get('rides');

        for (const drive of drives.value) {
            filter.countries.add(drive.from.country!);
            if (drive.from.city) filter.cities.add(drive.from.city);
            filter.cities.add(drive.destination.city);
        }

        filterValues.value = {
            countries: Array.from(filter.countries),
            cities: Array.from(filter.cities)
        };

        isLoaded.value = true;
    }

    function patchFilterValues(drive: Drive) {
        if (!filterValues.value!.countries.includes(drive.from.country!)) {
            filterValues.value!.countries.push(drive.from.country!);
        }
        if (
            drive.from.city && !filterValues.value!.cities.includes(drive.from.city)
            && !filterValues.value!.cities.includes(drive.destination.city)
        ) {
            filterValues.value!.cities.push(drive.from.country!);
        }
    }

    function add(drive: Drive) {
        patchFilterValues(drive);
        drives.value.push(drive);
    }

    function update(drive: Drive) {
        patchFilterValues(drive);
        const index = drives.value.findIndex((d: Drive) => d.id === drive.id);
        drives.value[index] = drive;
    }

    async function loadDrivesByDriver(driver: Drive) {
        return drives.value.filter((drive: Drive) => drive.driver.id === driver.id);
    }

    async function changeStatus(drive: Drive, status: DriveStatus) {
        if (!confirm('Ви впевнені що хочете змінити статус заявки?')) return;

        await http.patch(`rides/${drive.id}/status`, { status });
        // toast.default('Статус змінено', { duration: 3000 })
    }

    function applyPendingFilter(filter: DrivesFilter) {
        Object.assign(pendingFilter, filter);
    }

    return {
        drives,
        isLoaded,
        filterValues,
        pendingFilter,
        pendingFiltered,
        counter,
        load,
        add,
        update,
        loadDrivesByDriver,
        changeStatus,
        applyPendingFilter
    };
});

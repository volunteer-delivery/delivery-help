<template>
    <AppModal title="Фільтрувати Поїздки" :initial-focus="false">
        <AppForm :model="form" @submit="apply">
            <AppFormField id="fromCountry" label="З Країни" class="mb-3">
                <AppFormAutocompleteInput :options="countryOptions" />
            </AppFormField>

            <AppFormField id="fromCity" label="З Міста" class="mb-3" v-if="isFromUkraine">
                <AppFormAutocompleteInput :options="cityOptions" />
            </AppFormField>

            <AppFormField id="destinationCity" label="До Міста" class="mb-3">
                <AppFormAutocompleteInput :options="cityOptions" />
            </AppFormField>

            <AppFormField id="vehicles" label="Тип авто" class="mb-3">
                <AppFormSelect :options="vehicleOptions" />
            </AppFormField>

            <AppFormField id="departureRange" label="Дата поїздки" class="mb-6">
                <AppFormDatepicker :min="new Date()" />
            </AppFormField>

            <AppButton look="primary" type="submit" size="lg" class="w-full">
                Фільтрувати
            </AppButton>
        </AppForm>
    </AppModal>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es';
import type { IFormAutocompleteOption, IFormSelectOption } from '~/composables/use-form';
import type { IRidesFilter } from '~/stores/rides-store';
import { Vehicle } from '~/enums';

const ridesStore = useRidesStore();
const modal = useActiveModal();

const initialFormData = cloneDeep(ridesStore.pendingFilter);

const form = useForm<IRidesFilter>({
    fromCountry: {
        initial: initialFormData.fromCountry,
    },
    fromCity: {
        initial: initialFormData.fromCity,
    },
    departureRange: {
        initial: initialFormData.departureRange,
    },
    destinationCity: {
        initial: initialFormData.destinationCity,
    },
    vehicles: {
        initial: initialFormData.vehicles,
    },
});

function formatAddressOptions(addresses: Set<string>): IFormAutocompleteOption[] {
    return Array.from(addresses).map((country, index) => ({ id: index, value: country }));
}

const countryOptions = computed(() => formatAddressOptions(ridesStore.filterValues.countries));
const cityOptions = computed(() => formatAddressOptions(ridesStore.filterValues.cities));

const vehicleOptions: IFormSelectOption<Vehicle>[] = Object.values(Vehicle).map((vehicle) => ({
    value: vehicle,
    title: formatVehicle(vehicle),
}));

const isFromUkraine = computed(() => form.data.fromCountry?.toLowerCase() === 'україна');

function apply(): void {
    ridesStore.applyPendingFilter(form.data);
    modal.close();
}

watch(toRef(form.data, 'fromCountry'), () => form.data.fromCity = '');
</script>

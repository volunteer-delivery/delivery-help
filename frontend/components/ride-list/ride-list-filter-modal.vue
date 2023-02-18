<template>
    <AppModal title="Фільтрувати Поїздки" :initial-focus="false">
        <AppForm :model="form" @submit="apply">
            <AppFormField id="fromCountry" label="З Країни" class="mb-3">
                <AppFormAutocompleteInput :options="countryOptions" />
            </AppFormField>

            <AppFormField id="fromCity" label="З Міста" class="mb-3">
                <AppFormAutocompleteInput :options="cityOptions" />
            </AppFormField>

            <AppFormField id="destinationCity" label="До Міста" class="mb-6">
                <AppFormAutocompleteInput :options="cityOptions" />
            </AppFormField>

            <AppButton look="primary" type="submit" size="lg" class="w-full">
                Фільтрувати
            </AppButton>
        </AppForm>
    </AppModal>
</template>

<script lang="ts" setup>
import { IFormAutocompleteOption } from '~/composables/use-form';
import { RidesFilter } from '~/stores/rides-store';

const ridesStore = useRidesStore();
const modal = useActiveModal();

const form = useForm<RidesFilter>({
    fromCountry: {
        initial: ridesStore.pendingFilter.fromCountry,
    },
    fromCity: {
        initial: ridesStore.pendingFilter.fromCity,
    },
    departureRange: {
        initial: ridesStore.pendingFilter.departureRange,
    },
    destinationCity: {
        initial: ridesStore.pendingFilter.destinationCity,
    },
    vehicles: {
        initial: ridesStore.pendingFilter.vehicles,
    },
});

function formatAddressOptions(addresses: Set<string>): IFormAutocompleteOption[] {
    return Array.from(addresses).map((country, index) => ({ id: index, value: country }));
}

const countryOptions = computed(() => formatAddressOptions(ridesStore.filterValues.countries));
const cityOptions = computed(() => formatAddressOptions(ridesStore.filterValues.cities));

function apply(): void {
    ridesStore.applyPendingFilter(form.data);
    modal.close();
}
</script>

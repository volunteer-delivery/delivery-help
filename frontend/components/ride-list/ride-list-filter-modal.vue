<template>
    <AppModal title="Фільтрувати Поїздки" :initial-focus="false">
        <AppForm :model="form" @submit="apply">
            <AppFormField id="fromCountry" label="З Країни" class="mb-3">
                <AppFormAutocompleteInput :options="countryOptions" />
            </AppFormField>

            <AppFormField id="fromCity" label="З Міста" class="mb-3" v-if="isFromUkraine">
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

const initialFormData = clone(ridesStore.pendingFilter);

const form = useForm<RidesFilter>({
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

const isFromUkraine = computed(() => form.data.fromCountry?.toLowerCase() === 'україна');

function apply(): void {
    ridesStore.applyPendingFilter(form.data);
    modal.close();
}

watch(toRef(form.data, 'fromCountry'), () => form.data.fromCity = '');
</script>

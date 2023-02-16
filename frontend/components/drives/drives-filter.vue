<template>
    <v-card-title>Фільтр</v-card-title>

    <v-card-text>
        <v-autocomplete
            label="З країни"
            :items="filterValues.countries"
            auto-select-first
            clearable
            v-model="filter.fromCountry"
        />

        <v-autocomplete
            label="З міста"
            :items="filterValues.cities"
            auto-select-first
            clearable
            v-model="filter.fromCity"
            v-if="isFromUkraine"
        />

        <v-autocomplete
            label="До міста"
            :items="filterValues.cities"
            auto-select-first
            clearable
            v-model="filter.destinationCity"
        />

        <v-select
            label="Тип авто"
            item-text="title"
            item-value="value"
            multiple
            :items="vehicles"
            v-model="filter.vehicles"
        />

        <v-menu
            ref="menuRef"
            v-model="isSelectingDepartureTime"
            :close-on-content-click="false"
            v-model:return-value="filter.departureRange"
            offset-y
            min-width="auto"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    :value="departureTimeTriggerText"
                    :prepend-icon="mdiCalendar"
                    label="Дата поїздки"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @input="filter.departureRange = []"
                    clearable
                />
            </template>

            <v-date-picker
                v-model="filter.departureRange"
                no-title
                scrollable
                range
            />
        </v-menu>

        <v-btn class="mt-3" color="primary" block @click="apply">
            Фільтрувати
        </v-btn>
    </v-card-text>
</template>

<script setup>
/* eslint-disable */
import { mdiCalendar } from '@mdi/js';
import { Vehicle } from '~/enums';

const emit = defineEmits(['close']);

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const vehicles = [Vehicle.CAR, Vehicle.VAN, Vehicle.TRUCK].map((type) => ({
    value: type,
    title: formatVehicle(type),
}));

const ridesStore = useRidesStore();

const menuRef = ref(null);

const filter = reactive(clone(ridesStore.pendingFilter));
const { fromCountry, departureRange } = toRefs(filter);
const isSelectingDepartureTime = ref(false);

const filterValues = computed(() => ridesStore.filterValues);
const isFromUkraine = computed(() => filter.fromCountry === 'Україна');
const departureTimeTriggerText = computed(() => filter.departureRange.map(formatDate).join(' - '));

watch(fromCountry, () => filter.fromCity = null);

watch(departureRange, () => {
    if (filter.departureRange.length === 2) {
        menuRef.save(filter.departureRange);
    }
});

function apply() {
    ridesStore.applyPendingFilter(clone(filter));
    emit('close');
}
</script>

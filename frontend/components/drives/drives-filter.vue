<template>
    <div>
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
                :items="$options.vehicles"
                v-model="filter.vehicles"
            />

            <v-menu
                ref="menu"
                v-model="isSelectingDepartureTime"
                :close-on-content-click="false"
                :return-value.sync="filter.departureRange"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        :value="departureTimeTriggerText"
                        :prepend-icon="$options.icons.mdiCalendar"
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

<!--            TODO DRIVER_GRADE-->
<!--            <v-checkbox-->
<!--                label="Тільки перевірені водії"-->
<!--                v-model="filter.verifiedDriver"-->
<!--            />-->

            <v-btn class="mt-3" color="primary" block @click="apply">
                Фільтрувати
            </v-btn>
        </v-card-text>
    </div>
</template>

<script>
import { formatVehicle } from '~/utils/format-vehicle';
import { formatDate } from '~/utils/format-date';
import { mdiCalendar } from '@mdi/js';

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default {
    name: 'drives-filter',

    icons: {
        mdiCalendar
    },

    vehicles: ['CAR', 'VAN', 'TRUCK'].map(type => ({
        value: type,
        title: formatVehicle(type)
    })),

    data() {
        const filter = this.$store.state['drives-store'].pendingFilter;

        return {
            filter: clone(filter),
            isSelectingDepartureTime: false
        };
    },

    computed: {
        filterValues() {
            return this.$store.state['drives-store'].filterValues;
        },

        isFromUkraine() {
            return this.filter.fromCountry === 'Україна';
        },

        departureTimeTriggerText() {
            return this.filter.departureRange.map(formatDate).join(' - ');
        }
    },

    watch: {
        'filter.fromCountry'() {
            this.filter.fromCity = null;
        },
        'filter.departureRange'() {
            if (this.filter.departureRange.length === 2) {
                this.$refs.menu.save(this.filter.departureRange);
            }
        }
    },

    methods: {
        apply() {
            this.$store.commit('drives-store/setPendingFilter', clone(this.filter));
            this.$emit('close');
        }
    }
};
</script>

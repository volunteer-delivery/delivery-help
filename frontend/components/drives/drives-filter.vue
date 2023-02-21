<template>
    <v-card-text>
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
    </v-card-text>
</template>

<script setup>
/* eslint-disable */
import { mdiCalendar } from '@mdi/js';
import {cloneDeep} from "lodash-es";

const ridesStore = useRidesStore();

const menuRef = ref(null);

const filter = reactive(cloneDeep(ridesStore.pendingFilter));
const { departureRange } = toRefs(filter);
const isSelectingDepartureTime = ref(false);

const departureTimeTriggerText = computed(() => filter.departureRange.map(formatDate).join(' - '));

watch(departureRange, () => {
    if (filter.departureRange.length === 2) {
        menuRef.save(filter.departureRange);
    }
});
</script>

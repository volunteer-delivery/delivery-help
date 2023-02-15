<template>
    <section class="p-4 border-b border-b-slate-300 flex flex-col items-start">
        <RidePath class="mb-3" :path="ride.path" />

        <AppButton
            class="p-1 -ml-1 flex font-medium text-gray-500"
            :ripple="RippleColor.BLUE_800"
        >
            <Icon size="24">
                <AccountBoxRound />
            </Icon>

            <span class="ml-1">
                {{ ride.driver.name }}
            </span>
        </AppButton>

        <p class="flex m-0 items-center font-medium text-gray-500">
            <Icon size="24">
                <DirectionsCarRound />
            </Icon>

            <span class="ml-1">
                {{ vehicleDetails }}
            </span>
        </p>
    </section>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import {Icon} from "@vicons/utils";
import {AccountBoxRound, DirectionsCarRound} from '@vicons/material';
import {Ride} from "~/stores/rides-store";

const props = defineProps({
    ride: {
        type: Object as PropType<Ride>,
        required: true
    }
});

const vehicleDetails = computed(() => formatVehicleDetails(props.ride.vehicle));
</script>

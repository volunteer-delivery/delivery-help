<template>
    <div>
        <RidePath class="mb-3" :path="ride.path" />

        <AppButton
            class="p-1 -ml-1 mb-2 flex font-medium text-gray-500"
            :ripple="RippleColor.BLUE_800"
            @click="openDriverDetails"
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
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Icon } from '@vicons/utils';
import AccountBoxRound from '@vicons/material/AccountBoxRound';
import DirectionsCarRound from '@vicons/material/DirectionsCarRound';
import type { Ride } from '~/stores/ride-details-store';
import { DriverDetailsModal } from '#components';

const props = defineProps({
    ride: {
        type: Object as PropType<Ride>,
        required: true,
    },
});

const modalStore = useModalStore();

const vehicleDetails = computed(() => formatVehicleDetails(props.ride.vehicle));

const openDriverDetails = (): void => void modalStore.open(DriverDetailsModal, {
    props: { driver: props.ride.driver },
});
</script>

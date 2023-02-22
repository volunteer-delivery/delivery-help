<template>
    <section class="border-b border-b-slate-300 flex">
        <div class="flex flex-col items-start grow py-4 pl-4">
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

        <div class="self-end ml-2 pr-2 pb-2">
            <AppButton class="mb-2" look="icon" size="md" :to="phoneLink">
                <Icon class="text-blue-800" size="24">
                    <LocalPhoneRound />
                </Icon>
            </AppButton>

            <AppMenu>
                <template #activator="{ activatorRef, open }">
                    <AppButton look="icon" size="md" :ref="activatorRef" @click="open">
                        <Icon class="text-blue-800" size="24">
                            <MoreHorizRound />
                        </Icon>
                    </AppButton>
                </template>

                <AppButton
                    class="text-left w-full"
                    look="link"
                    size="lg"
                    v-if="canChangeStatus"
                    @click="changeStatus"
                >
                    {{ changeStatusText }}
                </AppButton>

                <AppButton
                    class="text-left w-full"
                    look="link"
                    size="lg"
                >
                    Деталі
                </AppButton>
            </AppMenu>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Icon } from '@vicons/utils';
import AccountBoxRound from '@vicons/material/AccountBoxRound';
import DirectionsCarRound from '@vicons/material/DirectionsCarRound';
import LocalPhoneRound from '@vicons/material/LocalPhoneRound';
import MoreHorizRound from '@vicons/material/MoreHorizRound';
import type { Ride } from '~/stores/rides-store';
import { RideStatus } from '~/enums';
import { DriverDetailsModal } from '#components';

const props = defineProps({
    ride: {
        type: Object as PropType<Ride>,
        required: true,
    },
});

const modalStore = useModalStore();
const toastStore = useToastStore();
const ridesStore = useRidesStore();

const vehicleDetails = computed(() => formatVehicleDetails(props.ride.vehicle));
const phoneLink = computed(() => `tel:${props.ride.driver.phone}`);

const openDriverDetails = (): void => void modalStore.open(DriverDetailsModal, {
    props: { driver: props.ride.driver },
});

const isPending = computed(() => props.ride.status === RideStatus.PENDING);
const isDone = computed(() => props.ride.status === RideStatus.FINISHED);
const canChangeStatus = computed(() => !isDone.value);
const changeStatusText = computed(() => isPending.value ? 'В активні' : 'Завершити');

async function changeStatus(): Promise<void> {
    if (!confirm('Ви впевнені що хочете змінити статус заявки?')) return;

    const status = isPending.value ? RideStatus.ACTIVE : RideStatus.FINISHED;
    await ridesStore.changeStatus(props.ride, status);

    toastStore.open('Статус змінено').closeAfter(3000);
}
</script>

<template>
    <section class="border-b border-b-slate-300 flex">
        <RideInfo class="flex flex-col items-start grow py-4 pl-4" :ride="ride" />

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
                    :to="rideDetailsLink"
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
import LocalPhoneRound from '@vicons/material/LocalPhoneRound';
import MoreHorizRound from '@vicons/material/MoreHorizRound';
import type { Ride } from '~/stores/ride-details-store';
import { RideStatus } from '~/enums';

const props = defineProps({
    ride: {
        type: Object as PropType<Ride>,
        required: true,
    },
});

const toastStore = useToastStore();
const ridesStore = useRidesStore();

const phoneLink = computed(() => `tel:${props.ride.driver.phone}`);

const isPending = computed(() => props.ride.status === RideStatus.PENDING);
const isDone = computed(() => props.ride.status === RideStatus.FINISHED);
const canChangeStatus = computed(() => !isDone.value);
const changeStatusText = computed(() => isPending.value ? 'В активні' : 'Завершити');

const rideDetailsLink = computed(() => `/rides/${props.ride.id}`);

async function changeStatus(): Promise<void> {
    if (!confirm('Ви впевнені що хочете змінити статус заявки?')) return;

    const status = isPending.value ? RideStatus.ACTIVE : RideStatus.FINISHED;
    await ridesStore.changeStatus(props.ride, status);

    toastStore.open('Статус змінено').closeAfter(3000);
}
</script>

<template>
    <AppFormField label="Статус Поїздки" :model="fieldModel">
        <AppFormSelect :options="statusOptions" />
    </AppFormField>
</template>

<script lang="ts" setup>
import { RideStatus } from '~/enums';
import type { IFormSelectOption } from '~/composables/use-form';

const ridesStore = useRidesStore();
const rideDetailsStore = useRideDetailsStore();

const statusOptions: IFormSelectOption[] = [
    {
        value: RideStatus.PENDING,
        title: 'Нова',
    },
    {
        value: RideStatus.ACTIVE,
        title: 'Активна',
    },
    {
        value: RideStatus.FINISHED,
        title: 'Завершена',
    },
];

const fieldModel = useFormField<RideStatus>({
    initial: rideDetailsStore.ride!.status,
});

watch(toRef(fieldModel, 'data'), (status) => {
    ridesStore.changeStatus(rideDetailsStore.ride!, status);
});
</script>

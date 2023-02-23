<template>
    <AppFormField label="Статус Поїздки" :model="fieldModel">
        <AppFormSelect :options="statusOptions" />
    </AppFormField>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { RideStatus } from '~/enums';
import { Ride } from '~/stores/ride-details-store';
import { IFormSelectOption } from '~/composables/use-form';

const props = defineProps({
    ride: {
        type: Object as PropType<Ride>,
        required: true,
    },
});

const ridesStore = useRidesStore();

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
    initial: props.ride.status,
});

watch(toRef(fieldModel, 'data'), (status) => {
    ridesStore.changeStatus(props.ride, status);
});
</script>

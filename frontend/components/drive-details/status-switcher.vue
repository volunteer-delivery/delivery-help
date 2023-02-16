<template>
    <v-overflow-btn
        class="drive-status-switcher"
        prefix="Статус поїздки:"
        :value="drive.status"
        :items="statuses"
        @change="changeStatus"
    />
</template>

<script setup>
/* eslint-disable */
import { RideStatus } from '~/enums';

const statuses = [
    { value: RideStatus.PENDING, text: 'нова' },
    { value: RideStatus.ACTIVE, text: 'активна' },
    { value: RideStatus.FINISHED, text: 'завершена' },
];

const props = defineProps({
    drive: {
        type: Object,
        required: true,
    },
});

const ridesStore = useRidesStore();

function changeStatus(status) {
    ridesStore.changeStatus(props.drive, status);
}
</script>

<style scoped>
.drive-status-switcher::v-deep .v-input__slot {
    border-top: none;
    border-bottom: 1px solid var(--bottom-border-color) !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    transition: 0.1s cubic-bezier(0.25, 0.8, 0.5, 1);

    --bottom-border-color: rgba(0, 0, 0, 0.42);
}

.drive-status-switcher.v-select--is-menu-active::v-deep .v-input__slot {
    --bottom-border-color: transparent;
}

.drive-status-switcher::v-deep .v-text-field__prefix {
    color: rgba(0, 0, 0, 0.6);
}

.drive-status-switcher::v-deep .v-select__selection {
    margin-left: 0 !important;
}
</style>

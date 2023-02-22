<template>
    <v-list class="action-dropdown">
        <v-list-item>
            <v-btn class="w-100" color="primary" text tile elevation="0" @click="changeStatus" v-if="canChangeStatus">
                <v-icon class="mr-3">
                    isPending ? mdiPlay : mdiCheck
                </v-icon>
                {{ isPending ? 'В активні' : 'Завершити' }}
            </v-btn>
        </v-list-item>

        <v-list-item>
            <v-btn class="w-100" color="primary" text tile elevation="0" :to="`/drives/${drive.id}`">
                <v-icon class="mr-3">
                    mdiChartTree
                </v-icon>
                Деталі
            </v-btn>
        </v-list-item>
    </v-list>
</template>

<script setup>
/* eslint-disable */
import { RideStatus } from '~/enums';

const props = defineProps({
    drive: {
        type: Object,
        required: true,
    },

    hideActions: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const ridesStore = useRidesStore();

const isPending = computed(() => props.drive.status === RideStatus.PENDING);
const isDone = computed(() => props.drive.status === RideStatus.FINISHED);
const canChangeStatus = computed(() => !isDone.value);

function changeStatus() {
    const status = isPending.value ? 'ACTIVE' : 'FINISHED';
    ridesStore.changeStatus(props.drive, status);
}
</script>

<style scoped>
@media (max-width: 600px) {
    .drive {
        border-radius: 0;
        box-shadow: none !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .drive:last-child {
        border-bottom-color: rgba(0, 0, 0, 0.05);
    }
}

.drive {
    overflow: hidden;
    position: relative;
}

.drive__phone {
    font-size: 16px !important;
    color: rgba(0, 0, 0, 0.6);
    align-self: stretch;
}

.drive__phone-icon {
    color: inherit;
}

.action-dropdown,
.action-dropdown .v-list-item {
    padding: 0;
    min-height: 0;
}

.action-dropdown .v-btn {
    justify-content: start;
}
</style>

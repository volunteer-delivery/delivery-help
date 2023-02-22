<template>
    <v-card class="drive" elevation="1">
        <v-card-text class="pb-0">
            <div class="d-flex pb-4 pb-sm-2">
                <v-card-actions class="pa-0" v-if="!hideActions">
                    <v-spacer />

                    <v-btn color="primary" icon text :href="driverPhoneLink">
                        <v-icon class="drive__phone-icon" dense>
                            mdiPhone
                        </v-icon>
                    </v-btn>

                    <v-menu offset-y>
                        <template #activator="{ on, attrs }">
                            <v-btn class="ml-2" v-on="on" v-bind="attrs" color="primary" icon text>
                                mdiDotsHorizontal
                            </v-btn>
                        </template>

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
                    </v-menu>
                </v-card-actions>
            </div>
        </v-card-text>
    </v-card>
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

const departureTime = computed(() => formatDate(props.drive.departureTime));
const driverPhone = computed(() => props.drive.driver.phone);
const driverPhoneLink = computed(() => `tel:${driverPhone.value}`);
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

<template>
    <v-card class="drive" elevation="1">
        <v-card-text class="pb-0">
            <div class="path mb-4 font-weight-medium">
                <div class="mb-8 d-flex align-end path__point">
                    <DrivePoint class="ma-0" :point="drive.from"/>
                    <span class="path__point-date">, {{ departureTime }}</span>
                </div>
                <div class="path__arrow"/>
                <DrivePoint class="path__point" :point="drive.destination"/>
            </div>

            <button
                type="button"
                class="subtitle-2 d-flex align-center drive__driver pt-2 pb-2 pr-2"
                @click="toggleDriverDetails(true)"
            >
                <v-icon class="mr-1" dense>{{ mdiAccount }}</v-icon>
                {{ drive.driver.name }}
            </button>

            <div class="d-flex pb-4 pb-sm-2">
                <v-tooltip right color="rgba(97, 97, 97, 1)">
                    <template #activator="{ on, attrs }">
                        <p
                            class="subtitle-2 d-flex align-center mb-0 drive__car"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon class="mr-1" dense>{{ mdiCar }}</v-icon>
                            {{ driverVehicle }}
                        </p>
                    </template>

                    <span>{{ driverTooltip }}</span>
                </v-tooltip>

                <v-spacer />

                <v-card-actions class="pa-0" v-if="!hideActions">
                    <v-spacer/>

                    <v-btn color="primary" icon text :href="driverPhoneLink">
                        <v-icon class="drive__phone-icon" dense>{{ mdiPhone }}</v-icon>
                    </v-btn>

                    <v-menu offset-y>
                        <template #activator="{ on, attrs }">
                            <v-btn class="ml-2" v-on="on" v-bind="attrs" color="primary" icon text>
                                <v-icon>{{ mdiDotsHorizontal }}</v-icon>
                            </v-btn>
                        </template>

                        <v-list class="action-dropdown">
                            <v-list-item>
                                <v-btn class="w-100" color="primary" text tile elevation="0" @click="changeStatus" v-if="canChangeStatus">
                                    <v-icon class="mr-3">
                                        {{ isPending ? mdiPlay : mdiCheck }}
                                    </v-icon>
                                    {{ isPending ? 'В активні' : 'Завершити' }}
                                </v-btn>
                            </v-list-item>

                            <v-list-item>
                                <v-btn class="w-100" color="primary" text tile elevation="0" :to="`/drives/${drive.id}`">
                                    <v-icon class="mr-3">
                                        {{ mdiChartTree }}
                                    </v-icon>
                                    Деталі
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-actions>
            </div>
        </v-card-text>

        <v-bottom-sheet v-model="isDriverDetailsDisplaying" content-class="driver-details-modal">
            <DriverDetails
                :driver="drive.driver"
                ref="detailsViewRef"
                @close="toggleDriverDetails(false)"
            />
        </v-bottom-sheet>
    </v-card>
</template>

<script setup>
import { mdiCar, mdiPhone, mdiDotsHorizontal, mdiCheck, mdiPlay, mdiChartTree, mdiAccount } from '@mdi/js';
import DrivePoint from '~/components/drives/drive-point';
import { formatVehicle, formatVehicleDetails } from '~/utils/format-vehicle';
import { formatDate } from '~/utils/format-date';
import DriverDetails from '~/components/drives/driver-details';
import {DriveStatus} from "~/enums";
import {useDrivesStore} from "~/store/drives-store";

const props = defineProps({
    drive: {
        type: Object,
        required: true
    },

    hideActions: {
        type: Boolean,
        required: false,
        default: false
    }
})

const drivesStore = useDrivesStore();

const detailsViewRef = ref(null);
const isDriverDetailsDisplaying = ref(false);

const departureTime = computed(() => formatDate(props.drive.departureTime));
const driverPhone = computed(() => props.drive.driver.phone);
const driverPhoneLink = computed(() => `tel:${driverPhone.value}`)
const driverVehicle = computed(() => formatVehicle(props.drive.vehicle));
const driverTooltip = computed(() => formatVehicleDetails(props.drive.vehicle));
const isPending = computed(() => props.drive.status === DriveStatus.PENDING);
const isDone = computed(() => props.drive.status === DriveStatus.FINISHED);
const canChangeStatus = computed(() => !isDone.value);

watch(isDriverDetailsDisplaying, async (isDisplaying) => {
    if (isDisplaying) {
        await nextTick();
        await detailsViewRef.value.onOpen();
    }
});

function changeStatus() {
    const status = isPending.value ? 'ACTIVE' : 'FINISHED'
    drivesStore.changeStatus(props.drive, status);
}

function toggleDriverDetails(isDisplaying) {
    isDriverDetailsDisplaying.value = isDisplaying;
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

/*
TODO DRIVER_GRADE

.drive::before {
    content: "";
    background-image: url("/verified-stamp.png");
    background-size: contain;
    transform: rotate(22deg) translate(-7px, 12px);
    width: 100px;
    height: 90px;
    position: absolute;
    top: 0;
    right: 0;
}
 */

.drive:not(.drive--verified)::before {
    filter: grayscale(100%);
    opacity: 0.05;
}

.path {
    position: relative;
}

.path::before,
.path::after {
    content: "";
    position: absolute;
    display: block;
    border-left: 2px solid #3F51B5;
    left: 8px;
}

.path::before {
    top: 16px;
    height: 14px;
}

.path::after {
    bottom: 13px;
    height: 18px;
}

.path__arrow {
    position: absolute;
    display: block;
    top: calc(50% - 3px);
    left: 4px;
    border: 5px solid transparent;
    border-top-color: #3F51B5;
}

.path__point {
    position: relative;
    padding-left: 24px;
    display: flex;
    margin: 0;
    color: #424242;
    font-size: 19px;
    line-height: 1;
}

.path__point-date {
    font-size: 16px;
    line-height: 1;
    color: #757575;
}

.path__point::before {
    position: absolute;
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translateY(-50%);
    top: 50%;
    left: 4px;
    border: 2px solid #3F51B5;
}

.path__point:first-child::before {
    background-color: #3F51B5;
}

.drive__driver {
    border: none;
    background: none;
    display: block;
    text-decoration: underline;
    font-size: 16px !important;
}

.drive__car {
    font-size: 16px !important;
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

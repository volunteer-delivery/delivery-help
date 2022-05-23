<template>
    <v-card class="drive" :class="cardClasses" elevation="1">
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
                <DriverIcon class="mr-1" :driver="drive.driver" :verified="isVerified"/>
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
                            <v-icon class="mr-1" dense>{{ $options.icons.mdiCar }}</v-icon>
                            {{ driverVehicle }}
                        </p>
                    </template>

                    <span>{{ driverTooltip }}</span>
                </v-tooltip>

                <v-spacer />

                <v-card-actions class="pa-0">
                    <v-spacer/>

                    <v-btn color="primary" icon text outlined :href="driverPhoneLink">
                        <v-icon class="drive__phone-icon" dense>{{ $options.icons.mdiPhone }}</v-icon>
                    </v-btn>

                    <v-btn class="ml-4" color="primary" text outlined elevation="0" @click="changeStatus">
                        {{ isPending ? 'В активні' : 'Завершити' }}
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card-text>

        <v-bottom-sheet v-model="isDriverDetailsDisplaying" content-class="driver-details-modal">
            <DriverDetails
                :driver="drive.driver"
                ref="detailsView"
                @close="toggleDriverDetails(false)"
            />
        </v-bottom-sheet>
    </v-card>
</template>

<script>
import { mdiCar, mdiPhone } from '@mdi/js';
import DrivePoint from '~/components/drives/drive-point';
import DriverIcon from '~/components/drives/driver-icon';
import { formatVehicle, formatVehicleDetails } from '~/utils/format-vehicle';
import { formatDate } from '~/utils/format-date';
import DriverDetails from '~/components/drives/driver-details';

export default {
    name: 'drive',

    components: {
        DriverDetails,
        DriverIcon,
        DrivePoint
    },

    icons: {
        mdiCar,
        mdiPhone
    },

    props: {
        drive: Object
    },

    data: () => ({
        isDriverDetailsDisplaying: false
    }),

    computed: {
        departureTime() {
            return formatDate(this.drive.departureTime);
        },

        driverPhone() {
            return this.drive.driver.phone;
        },

        driverPhoneLink() {
            return `tel:${this.driverPhone}`;
        },

        driverVehicle() {
            return formatVehicle(this.drive.vehicle);
        },

        driverTooltip() {
            return formatVehicleDetails(this.drive.vehicle);
        },

        isVerified() {
            return this.drive.driver.grade === 'VERIFIED';
        },

        cardClasses() {
            return {
                'drive--verified': this.isVerified
            };
        },

        isPending() {
            return this.drive.status === 'PENDING';
        }
    },

    watch: {
        async isDriverDetailsDisplaying() {
            if (this.isDriverDetailsDisplaying) {
                await this.$nextTick();
                await this.$refs.detailsView.onOpen();
            }
        }
    },

    methods: {
        changeStatus() {
            this.$store.dispatch('drives-store/changeStatus', {
                drive: this.drive,
                status: this.isPending ? 'ACTIVE' : 'FINISHED'
            });
        },

        toggleDriverDetails(isDisplaying) {
            this.isDriverDetailsDisplaying = isDisplaying;
        }
    }
};
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
</style>

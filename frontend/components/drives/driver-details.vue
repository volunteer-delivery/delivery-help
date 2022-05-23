<template>
    <v-card tile>
        <v-row class="driver-details__row" justify="center" align="center">
            <v-col class="pt-5" cols="12" sm="8" md="4">
                <div class="d-flex align-center justify-space-between pr-4 driver-details__heading">
                    <v-card-title>
                        {{ driver.name }}
                    </v-card-title>

                    <v-btn icon @click="close">
                        <v-icon>{{ $options.icons.mdiClose }}</v-icon>
                    </v-btn>
                </div>

                <div class="driver-details__body--loading" v-if="isLoading">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                        size="48"
                        class="mb-10"
                    />
                </div>

                <template v-else>
                    <v-card-text class="body-1">
                        <p class="d-flex align-center">
                            <v-icon :color="verifiedIconColor">{{ verifiedIcon }}</v-icon>
                            <span class="ml-2">{{ verifiedMessage }}</span>
                        </p>

                        <a class="d-inline-flex align-center driver-details__phone" :href="driverPhoneLink">
                            <v-icon>{{ $options.icons.mdiPhone }}</v-icon>

                            <span class="ml-2" >
                                {{ driverPhone }}
                            </span>
                        </a>
                    </v-card-text>

                    <v-divider/>

                    <v-list class="pb-5 pb-md-10" subheader>
                        <v-subheader class="text-h6 driver-details__section-heading">
                            Історія
                        </v-subheader>

                        <v-list-item
                            class="d-flex pl-5 pr-5 align-center driver-details__history-item"
                            v-for="drive of drives"
                            :key="drive.id"
                        >
                            <p class="mb-0 mt-0 mr-10 driver-details__history-item-time">
                                {{ formatDate(drive.departureTime) }}
                            </p>
                            <DrivePoint
                                class="mb-0 driver-details__history-item-point"
                                :point="drive.from"
                            />

                            <div class="ml-2 driver-details__history-item-arrow"/>

                            <DrivePoint
                                class="ml-4 mb-0 driver-details__history-item-point text-right"
                                :point="drive.destination"
                            />
                        </v-list-item>
                    </v-list>
                </template>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { mdiCheck, mdiClose, mdiPhone } from '@mdi/js';
import DrivePoint from '@/components/drives/drive-point';
import { formatDate } from '@/utils/format-date';

export default {
    name: 'driver-details',

    components: {
        DrivePoint
    },

    icons: {
        mdiClose,
        mdiCheck,
        mdiPhone
    },

    props: {
        driver: Object
    },

    computed: {
        isVerified() {
            return this.driver.grade === 'VERIFIED';
        },

        verifiedIcon() {
            return this.isVerified ? mdiCheck : mdiClose;
        },

        verifiedIconColor() {
            return this.isVerified ? 'primary' : 'error';
        },

        verifiedMessage() {
            return this.isVerified ? 'Водій перевірений' : 'Водій не перевірений';
        },

        driverPhone() {
            return this.driver.phone;
        },

        driverPhoneLink() {
            return `tel:${this.driverPhone}`;
        }
    },

    data: () => ({
        isLoading: true,
        drives: []
    }),

    methods: {
        formatDate,

        close() {
            this.$emit('close');
            this.isLoading = true;
        },

        async onOpen() {
            this.drives = await this.$store.dispatch('drives-store/loadDrivesByDriver', this.driver);
            this.isLoading = false;
        }
    }
};
</script>

<style>
.driver-details-modal {
    overflow-y: auto !important;
    overflow-x: hidden !important;
}
</style>

<style scoped>
.driver-details__row {
    margin-top: 0;
    margin-bottom: 0;
}

.driver-details__heading {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 1;
}

.driver-details__body--loading {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.driver-details__phone {
    color: inherit;
}

.driver-details__section-heading {
    font-size: 1rem !important;
}

.driver-details__history-item::after {
    content: none !important;
}

.driver-details__history-item-point {
    flex-basis: 0;
    flex-grow: 1;
}

.driver-details__history-item-time {
    color: #757575;
}

.driver-details__history-item-arrow {
    position: relative;
    border-bottom: 2px solid #3F51B5;
    width: 20px;
}

.driver-details__history-item-arrow::before {
    content: "";
    position: absolute;
    border: 6px solid transparent;
    border-left-color: #3F51B5;
    right: -12px;
    top: -5px;
}
</style>

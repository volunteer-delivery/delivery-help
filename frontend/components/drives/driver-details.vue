<template>
    <v-card tile>
        <v-row class="driver-details__row" justify="center" align="center">
            <v-col class="pt-5" cols="12" sm="8" md="4">
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
                        <!--                            <DrivePoint-->
                        <!--                                class="mb-0 driver-details__history-item-point"-->
                        <!--                                :point="drive.from"-->
                        <!--                            />-->

                        <div class="ml-2 driver-details__history-item-arrow" />

                        <!--                            <DrivePoint-->
                        <!--                                class="ml-4 mb-0 driver-details__history-item-point text-right"-->
                        <!--                                :point="drive.destination"-->
                        <!--                            />-->
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-card>
</template>

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

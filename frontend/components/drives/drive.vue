<template>
  <v-card :class="cardClasses" elevation="1">
    <v-card-text>
      <div class="path mb-5">
        <div class="mb-8 d-flex align-end">
          <DrivePoint class="path__point path__point--from" :point="drive.from" />
          <span class="path__point-date">, {{ departureTime }}</span>
        </div>
        <div class="path__arrow" />
        <DrivePoint class="path__point" :point="drive.destination" />
      </div>

      <p class="subtitle-2 d-flex align-center">
        <DriverIcon class="mr-1" :driver="drive.driver" :verified="isVerified" />
        {{ drive.driver.name }}
      </p>

      <p class="subtitle-2 d-flex align-center">
        <v-icon class="mr-1" dense>mdi-car</v-icon>
        {{ driverVehicle }}
      </p>

      <a class="subtitle-2 d-flex align-center drive__phone" :href="driverPhone">
        <v-icon class="mr-1 drive__phone-icon" dense>mdi-phone</v-icon>
        {{ drive.driver.phone }}
      </a>
    </v-card-text>
  </v-card>
</template>

<script>
import DrivePoint from "~/components/drives/drive-point";
import DriverIcon from "~/components/drives/driver-icon";
import {formatVehicle} from "~/utils/format-vehicle";
import {formatDate} from "~/utils/format-date";

export default {
  name: "drive",

  components: {
    DriverIcon,
    DrivePoint
  },

  props: {
    drive: Object
  },

  computed: {
    departureTime() {
      return formatDate(this.drive.departureTime);
    },

    driverPhone() {
      return `tel:${this.drive.driver.phone}`;
    },

    driverVehicle() {
      return formatVehicle(this.drive.vehicle);
    },

    isVerified() {
      return this.drive.driver.grade === 'VERIFIED';
    },

    cardClasses() {
      return {
        'drive--verified': this.isVerified
      }
    }
  }
}
</script>

<style scoped>
.drive--verified {
  overflow: hidden;
  position: relative;
}

.drive--verified::before {
  content: "";
  background-image: url("/verified-stamp.png");
  background-size: contain;
  transform: rotate(22deg) translate(-4px, -12px);
  width: 100px;
  height: 90px;
  position: absolute;
  top: 0;
  right: 0;
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
  left: 7px;
}

.path::before {
  top: 16px;
  height: 14px;
}

.path::after {
  bottom: 10px;
  height: 18px;
}

.path__arrow {
  position: absolute;
  display: block;
  top: calc(50% - 3px);
  left: 3px;
  border: 5px solid transparent;
  border-top-color: #3F51B5;
}

.path__point {
  position: relative;
  padding-left: 20px;
  display: flex;
  margin: 0;
  color: #424242;
  font-size: 16px;
  line-height: 16px;
}

.path__point-date {
  font-size: 14px;
  line-height: 14px;
  color: #757575;
}

.path__point::before {
  position: absolute;
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transform: translateY(-50%);
  top: 50%;
  left: 4px;
  border: 2px solid #3F51B5;
}

.path__point--from::before {
  background-color: #3F51B5;
}

.drive__phone {
  text-decoration: none;
  color: inherit;
}
</style>

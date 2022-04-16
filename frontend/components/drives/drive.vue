<template>
  <v-card :class="cardClasses" elevation="1">
    <v-card-text>
      <div class="path mb-5">
        <div class="mb-5 d-flex align-end">
          <DrivePoint class="path__point" :point="drive.from" />
          <span class="path__point-date">, {{ departureTime }}</span>
        </div>

        <DrivePoint class="path__point path__point--destination" :point="drive.destination" />
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
      const date = new Date(this.drive.departureTime);

      const month = [
        'Січня',
        'Лютого',
        'Березня',
        'Квітня',
        'Травня',
        'Червня',
        'Липня',
        'Серпня',
        'Вересня',
        'Жовтня',
        'Листопада',
        'Грудня'
      ][date.getMonth()];

      return `${date.getDate()} ${month}`;
    },

    driverPhone() {
      return `tel:${this.drive.driver.phone}`;
    },

    driverVehicle() {
      return {
        CAR: 'Легковушка',
        VAN: 'Грузова',
        TRUCK: 'Фура'
      }[this.drive.vehicle];
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

.path::before {
  content: "";
  position: absolute;
  display: block;
  border-left: 2px solid #3F51B5;
  left: 7px;
  top: 16px;
  height: calc(100% - 32px);
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

.path__point--destination::before {
  background-color: #3F51B5;
}

.drive__phone {
  text-decoration: none;
  color: inherit;
}
</style>

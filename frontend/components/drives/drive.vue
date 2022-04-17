<template>
  <v-card :class="cardClasses" elevation="1">
    <v-card-text>
      <div class="path mb-3">
        <div class="mb-8 d-flex align-end">
          <DrivePoint class="path__point path__point--from" :point="drive.from" />
          <span class="path__point-date">, {{ departureTime }}</span>
        </div>
        <div class="path__arrow" />
        <DrivePoint class="path__point" :point="drive.destination" />
      </div>

      <button
        type="button"
        class="subtitle-2 d-flex align-center drive__driver"
        @click="isDriverDetailsDisplaying = true"
      >
        <DriverIcon class="mr-1" :driver="drive.driver" :verified="isVerified" />
        {{ drive.driver.name }}
      </button>

      <p class="subtitle-2 d-flex align-center">
        <v-icon class="mr-1" dense>mdi-car</v-icon>
        {{ driverVehicle }}
      </p>

      <a class="subtitle-2 d-flex align-center drive__phone" :href="driverPhone">
        <v-icon class="mr-1 drive__phone-icon" dense>mdi-phone</v-icon>
        {{ drive.driver.phone }}
      </a>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn color="primary" outlined @click="changeStatus">
        {{ isPending ? 'В активні' : 'Завершити' }}
      </v-btn>
    </v-card-actions>

    <v-bottom-sheet :value="isDriverDetailsDisplaying" persistent content-class="driver-details-modal">
      <DriverDetails
        :driver="drive.driver"
        ref="detailsView"
        @close="isDriverDetailsDisplaying = false"
      />
    </v-bottom-sheet>
  </v-card>
</template>

<script>
import DrivePoint from "~/components/drives/drive-point";
import DriverIcon from "~/components/drives/driver-icon";
import {formatVehicle} from "~/utils/format-vehicle";
import {formatDate} from "~/utils/format-date";
import DriverDetails from "~/components/drives/driver-details";

export default {
  name: "drive",

  components: {
    DriverDetails,
    DriverIcon,
    DrivePoint
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

.drive__driver {
  border: none;
  background: none;
  padding: 8px 0;
  margin-bottom: 8px;
  display: block;
  width: 100%;
}

.drive__phone {
  text-decoration: none;
  color: inherit;
}
</style>

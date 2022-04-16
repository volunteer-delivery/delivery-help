<template>
  <v-card class="p-4">
    <DrivePoint :point="drive.from" />
    <DrivePoint :point="drive.destination" />
  </v-card>
</template>

<script>
import DrivePoint from "~/components/drives/drive-point";

export default {
  name: "drive",

  components: {
    DrivePoint
  },

  props: {
    drive: Object
  }
}
</script>

<style scoped>

</style>

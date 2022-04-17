<template>
  <v-card tile>
    <div class="d-flex align-center justify-space-between pr-4">
      <v-card-title>
        {{ driver.name }}
      </v-card-title>

      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-card-text>
      dddd
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "driver-details",

  props: {
    driver: Object
  }
}
</script>

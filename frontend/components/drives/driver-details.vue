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

    <div>
      <v-card-text>
        <p class="d-flex align-center">
          <v-icon :color="verifiedIconColor">{{ verifiedIcon }}</v-icon>
          <span class="ml-2">{{ verifiedMessage }}</span>
        </p>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "driver-details",

  props: {
    driver: Object
  },

  computed: {
    isVerified() {
      return this.driver.grade === 'VERIFIED';
    },

    verifiedIcon() {
      return this.isVerified ? 'mdi-check' : 'mdi-close';
    },

    verifiedIconColor() {
      return this.isVerified ? 'primary' : 'error';
    },

    verifiedMessage() {
      return this.isVerified ? 'Водій перевірений' : 'Водій не перевірений';
    }
  }
}
</script>

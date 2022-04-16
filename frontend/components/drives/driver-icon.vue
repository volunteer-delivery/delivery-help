<template>
  <v-icon :class="iconClasses" dense>{{ iconName }}</v-icon>
</template>

<script>
export default {
  name: "driver-icon",

  props: {
    driver: Object
  },

  computed: {
    isVerified() {
      return this.driver.grade === 'VERIFIED';
    },

    iconName() {
      return this.isVerified ? 'mdi-account-check' : 'mdi-account';
    },

    iconClasses() {
      return {
        'driver-icon--verified': this.isVerified
      }
    }
  }
}
</script>

<style scoped>
.driver-icon--verified {
  color: #3F51B5;;
}
</style>

<template>
  <div>
    <div class="d-flex justify-space-between align-center pr-3">
      <v-card-title>Фільтрувати</v-card-title>

      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-card-text>
      driver-filter
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "drives-filter"
}
</script>

<style scoped>

</style>

<template>
  <div>
    <v-card-title>Фільтрувати</v-card-title>

    <v-card-text>
      <v-autocomplete
        class="mb-5"
        label="З країни"
        :items="filterValues.countries"
        auto-select-first
        v-model="filter.fromCountry"
      />

      <v-btn color="primary" block @click="apply">
        Фільтрувати
      </v-btn>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "drives-filter",

  data() {
    const filter = this.$store.state['drives-store'].pendingFilter;

    return {
      filter: JSON.parse(JSON.stringify(filter))
    };
  },

  computed: {
    filterValues() {
      return this.$store.state['drives-store'].filterValues;
    }
  },

  methods: {
    apply() {
      console.log(this.filter);
    }
  }
}
</script>

<template>
  <div>
    <v-card-title>Фільтрувати</v-card-title>

    <v-card-text>
      <v-autocomplete
        label="З країни"
        :items="filterValues.countries"
        auto-select-first
        v-model="filter.fromCountry"
      />

      <v-autocomplete
        label="З міста"
        :items="filterValues.cities"
        auto-select-first
        v-model="filter.fromCity"
        v-if="isFromUkraine"
      />

      <v-btn class="mt-3" color="primary" block @click="apply">
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
    },

    isFromUkraine() {
      return this.filter.fromCountry === 'Україна';
    }
  },

  watch: {
    'filter.fromCountry'() {
      this.filter.fromCity = null;
    }
  },

  methods: {
    apply() {
      console.log(this.filter);
    }
  }
}
</script>

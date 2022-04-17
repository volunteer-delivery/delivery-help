<template>
  <div>
    <v-card-title>Фільтрувати</v-card-title>

    <v-card-text>
      <v-autocomplete
        label="З країни"
        :items="filterValues.countries"
        auto-select-first
        clearable
        v-model="filter.fromCountry"
      />

      <v-autocomplete
        label="З міста"
        :items="filterValues.cities"
        auto-select-first
        clearable
        v-model="filter.fromCity"
        v-if="isFromUkraine"
      />

      <v-autocomplete
        label="До міста"
        :items="filterValues.cities"
        auto-select-first
        clearable
        v-model="filter.destinationCity"
      />

      <v-select
        label="Тип авто"
        item-text="title"
        item-value="value"
        multiple
        :items="$options.vehicles"
        v-model="filter.vehicles"
      />

      <v-btn class="mt-3" color="primary" block @click="apply">
        Фільтрувати
      </v-btn>
    </v-card-text>
  </div>
</template>

<script>
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  name: "drives-filter",

  vehicles: [
    { value: 'CAR', title: 'Легковушка' },
    { value: 'VAN', title: 'Грузова' },
    { value: 'TRUCK', title: 'Фура' }
  ],

  data() {
    const filter = this.$store.state['drives-store'].pendingFilter;

    return {
      filter: clone(filter)
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
      this.$store.commit('drives-store/setPendingFilter', clone(this.filter));
      this.$emit('close');
    }
  }
}
</script>

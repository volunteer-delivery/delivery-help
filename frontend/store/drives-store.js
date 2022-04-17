import Vue from 'vue';

export const state = () => ({
  drives: [],
  isLoaded: false,
  filterValues: null,

  pendingFilter: {
    fromCountry: null,
    fromCity: null,
    destinationCity: null,
    vehicles: [],

    departureRange: {
      from: null,
      to: null
    }
  }
});

export const getters = {
  pending(state) {
    return state.drives.filter(drive => drive.status === 'PENDING');
  },

  active(state) {
    return state.drives.filter(drive => drive.status === 'ACTIVE');
  },

  pendingFiltered({ pendingFilter }, { pending }) {
    return pending.filter(drive => {
      if (pendingFilter.fromCountry && pendingFilter.fromCountry !== drive.from.country) return false;
      if (pendingFilter.fromCity && pendingFilter.fromCity !== drive.from.city) return false;
      if (pendingFilter.destinationCity && pendingFilter.destinationCity !== drive.destination.city) return false;
      if (pendingFilter.vehicles.length && !pendingFilter.vehicles.includes(drive.vehicle)) return false;

      if (pendingFilter.from && pendingFilter.to) {
        const departureTime = Number(new Date(drive.departureTime));

        if (departureTime < Number(pendingFilter.from)) return false;
        if (departureTime > Number(pendingFilter.to)) return false;
      }

      return true;
    });
  },

  pendingFilteredSorted(_, getters) {
    return getters.pendingFiltered.sort((d1, d2) => {
      return Number(new Date(d1)) - Number(new Date(d2));
    });
  }
};

export const actions = {
  async load(context) {
    if (context.state.isLoaded) return;

    const filter = {
      countries: new Set(),
      cities: new Set()
    };

    const response = await this.$axios.get('rides');

    for (const drive of response.data.rides) {
      filter.countries.add(drive.from.country);
      if (drive.from.city) filter.cities.add(drive.from.city);
      filter.cities.add(drive.destination.city);
    }

    context.commit('setDrives', response.data.rides);

    context.commit('setFilterValues', {
      countries: Array.from(filter.countries),
      cities: Array.from(filter.cities)
    });

    context.commit('setLoaded', true);
  },

  add(context, drive) {
    context.commit('patchFilterValues', drive);
    context.commit('add', drive);
  },

  update(context, drive) {
    context.commit('patchFilterValues', drive);
    context.commit('replace', drive);
  }
};

export const mutations = {
  setDrives(state, drives) {
    state.drives = drives;
  },

  patchFilterValues(state, drive) {
    if (!state.filterValues.countries.includes(drive.from.country)) {
      state.filterValues.countries.push(drive.from.country);
    }
    if (
      drive.from.city && !state.filterValues.cities.includes(drive.from.city)
      && !state.filterValues.cities.includes(drive.destination.city)
    ) {
      state.filterValues.cities.push(drive.from.country);
    }
  },

  add(state, drive) {
    state.pending.push(drive);
  },

  replace(state, drive) {
    const index = state.drives.findIndex(d => d.id === drive.id);
    Vue.set(state.drives, index, drive);
  },

  setLoaded(state, isLoaded) {
    state.isLoaded = isLoaded;
  },

  setFilterValues(state, values) {
    state.filterValues = values;
  },

  setPendingFilter(state, filter) {
    state.pendingFilter = filter;
  }
}

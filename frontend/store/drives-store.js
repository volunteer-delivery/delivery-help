export const state = () => ({
  pending: [],
  active: [],
  isLoaded: false,

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
  filterValues(state) {
    const fromCountries = new Set();
    const fromCities = new Set();
    const destinationCities = new Set();

    for (const drive of state.pending.concat(state.active)) {
      fromCountries.add(drive.from.country);
      if (drive.from.city) fromCities.add(drive.from.city);
      destinationCities.add(drive.destination.city);
    }

    return {
      fromCountries: Array.from(fromCountries),
      fromCities: Array.from(fromCities),
      destinationCities: Array.from(destinationCities)
    }
  },

  pendingFiltered({ pending, pendingFilter }) {
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
  }
};

export const actions = {
  async load(context) {
    if (context.state.isLoaded) return;

    const groups = {
      PENDING: [],
      ACTIVE: [],
      FINISHED: []
    };

    const response = await this.$axios.get('rides');

    for (const drive of response.data.rides) {
      groups[drive.status].push(drive);
    }

    context.commit('setPending', groups.PENDING);
    context.commit('setActive', groups.ACTIVE);
    context.commit('setLoaded', true);
  }
};

export const mutations = {
  setPending(state, drives) {
    state.pending = drives;
  },

  setActive(state, drives) {
    state.active = drives;
  },

  setLoaded(state, isLoaded) {
    state.isLoaded = isLoaded;
  }
}

export const state = () => ({
  pending: [],
  active: [],
  isLoaded: false
});

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

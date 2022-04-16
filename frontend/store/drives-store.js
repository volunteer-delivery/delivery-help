import mock from '../drives-mock.json';

export const state = () => ({
  pending: [],
  active: [],
  isLoaded: false
});

export const actions = {
  load(context) {
    if (context.state.isLoaded) return;

    const groups = {
      PENDING: [],
      ACTIVE: [],
      FINISHED: []
    };

    for (const drive of mock) {
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

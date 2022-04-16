export const state = () => ({
  extra: null,
  extraOpened: false
});

export const mutations = {
  setExtra(state, extra) {
    state.extra = extra;
    state.extraOpened = false;
  },

  openExtra(state) {
    state.extraOpened = true;
  },

  closeExtra(state) {
    state.extraOpened = false;
  }
};

export const state = () => ({
  drives: []
});

export const actions = {
  load(context) {
    context.commit('setDrives', [
      {
        id: 'dddddd'
      },
      {
        id: 'dddddd'
      }
    ]);
  }
};

export const mutations = {
  setDrives(state, drives) {
    state.drives = drives;
  }
}

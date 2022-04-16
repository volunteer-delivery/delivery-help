import mock from '../running-drives-mock.json';

export const state = () => ({
  drives: []
});

export const actions = {
  load(context) {
    context.commit('setDrives', mock);
  }
};

export const mutations = {
  setDrives(state, drives) {
    state.drives = drives;
  }
}

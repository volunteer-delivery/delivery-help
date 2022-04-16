export const state = () => ({
  drives: []
});

export const actions = {
  load(context) {
    context.commit('setDrives', [
      {
        id: '123e4567-e89b-12d3-a456-426655440000',
        driver: {
          id: '123e4567-e89b-12d3-a456-426655440000',
          name: 'Петро',
          phone: '+388005553535',
          grade: 'NOT VERIFIED'
        },
        from: {
          country: 'Польща'
        },
        destination: {
          country: 'Україна',
          city: 'Київ'
        },
        departureTime: '2022-04-21'
      },
      {
        id: '123e4567-e89b-12d3-a456-426655440000',
        driver: {
          id: '331e4567-e89b-12d3-a456-4266554433122',
          name: 'Ніколай Сергійович',
          phone: '+3801432288',
          grade: 'VERIFIED'
        },
        from: {
          country: 'Україна',
          city: 'Львів'
        },
        destination: {
          country: 'Україна',
          city: 'Запоріжжя'
        },
        departureTime: '2022-04-24'
      }
    ]);
  }
};

export const mutations = {
  setDrives(state, drives) {
    state.drives = drives;
  }
}

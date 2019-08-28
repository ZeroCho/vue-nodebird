export const state = () => ({
  hello: 'vuex',
});

export const mutations = () => ({
  bye(state) {
    state.hello = 'goodbye';
  }
});

export const actions = {
  nuxtServerInit({ commit, dispatch, state }, { req }) {
    return dispatch('users/loadUser');
  },
};

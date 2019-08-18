export const state = () => ({
  mainPosts: [],
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
};

export const actions = {
  add({ commit }, payload) {
    commit('addMainPost', payload);
  },
  addComment({ commit }, payload) {
    commit('addComment', payload);
  },
  remove({ commit }, payload) {
    commit('removeMainPost', payload);
  },
};

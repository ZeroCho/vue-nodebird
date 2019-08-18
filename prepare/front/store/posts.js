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
};

export const actions = {
  add({ commit }, payload) {
    commit('addMainPost', payload);
  },
  addComment({ commit }, payload) {
    commit('addComment', payload);
  }
};

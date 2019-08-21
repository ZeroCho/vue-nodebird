export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
});

const totalPost = 101;
const limit = 10;

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
  loadPosts(state) {
    const diff = totalPost - state.mainPosts.length;
    const fakePosts = Array(diff > limit ? limit : diff)
      .fill()
      .map(v => ({
        id: Math.random().toString(),
        User: {
          id: 1,
          nickname: '제로초',
        },
        content: `Hello infinite scrolling~ ${Math.random().toString()}`,
        Comments: [],
        Images: [],
      }));
    state.mainPosts = state.mainPosts.concat(fakePosts);
    state.hasMorePost = fakePosts.length === limit;
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
  loadPosts({ commit, state }) {
    if (state.hasMorePost) {
      commit('loadPosts');
    }
  },
};

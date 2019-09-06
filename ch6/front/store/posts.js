import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts.splice(index, 1);
  },
  loadComments(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    // 실수: state.mainPosts[index].Comments = payload.data;
    Vue.set(state.mainPosts[index], 'Comments', payload.data);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadPost(state, payload) {
    state.mainPosts = [payload];
  },
  loadPosts(state, payload) {
    if (payload.reset) {
      state.mainPosts = payload.data;
    } else {
      state.mainPosts = state.mainPosts.concat(payload.data);
    }
    state.hasMorePost = payload.data.length === 10;
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  },
  unlikePost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const userIndex = state.mainPosts[index].Likers.findIndex(v => v.id === payload.userId);
    state.mainPosts[index].Likers.splice(userIndex, 1);
  },
  likePost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Likers.push({
      id: payload.userId,
    });
  },
};

export const actions = {
  add({ commit, state }, payload) {
    // 서버에 게시글 등록 요청 보냄
    this.$axios.post('/post', {
      content: payload.content,
      image: state.imagePaths,
    }, {
      withCredentials: true,
    })
      .then((res) => {
        commit('addMainPost', res.data);
      })
      .catch(() => {

      });
  },
  remove({ commit }, payload) {
    this.$axios.delete(`/post/${payload.postId}`, {
      withCredentials: true,
    })
      .then(() => {
        commit('removeMainPost', payload);
      })
      .catch(() => {

      });
  },
  addComment({ commit }, payload) {
    this.$axios.post(`/post/${payload.postId}/comment`, {
      content: payload.content,
    }, {
      withCredentials: true,
    })
      .then((res) => {
        console.log('addComment');
        commit('addComment', res.data);
      })
      .catch(() => {

      });
  },
  loadComments({ commit }, payload) {
    this.$axios.get(`/post/${payload.postId}/comments`)
      .then((res) => {
        commit('loadComments', {
          postId: payload.postId,
          data: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  async loadPost({ commit, state }, payload) {
    try {
      const res = await this.$axios.get(`/post/${payload}`);
      commit('loadPost', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  loadPosts: throttle(async function ({ commit, state }, payload) {
    console.log('loadPosts');
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts?limit=10`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const res = await this.$axios.get(`/posts?lastId=${lastPost && lastPost.id}&limit=10`);
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000),
  loadUserPosts: throttle(async function ({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/user/${payload.userId}/posts?limit=10`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const res = await this.$axios.get(`/user/${payload.userId}/posts?lastId=${lastPost && lastPost.id}&limit=10`);
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000),
  loadHashtagPosts: throttle(async function ({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/hashtag/${payload.hashtag}?limit=10`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const res = await this.$axios.get(`/hashtag/${payload.hashtag}?lastId=${lastPost && lastPost.id}&limit=10`);
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000),
  uploadImages({ commit }, payload) {
    this.$axios.post('/post/images', payload, {
      withCredentials: true,
    })
      .then((res) => {
        commit('concatImagePaths', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  retweet({ commit }, payload) {
    this.$axios.post(`/post/${payload.postId}/retweet`, {}, {
      withCredentials: true,
    })
      .then((res) => {
        commit('addMainPost', res.data);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      });
  },
  likePost({ commit }, payload) {
    this.$axios.post(`/post/${payload.postId}/like`, {}, {
      withCredentials: true,
    })
      .then((res) => {
        commit('likePost', {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  unlikePost({ commit }, payload) {
    this.$axios.delete(`/post/${payload.postId}/like`, {
      withCredentials: true,
    })
      .then((res) => {
        console.log('unlikePost');
        commit('unlikePost', {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

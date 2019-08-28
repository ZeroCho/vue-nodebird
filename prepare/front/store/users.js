export const state = () => ({
  me: null, // 내 정보
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  userInfo: null, // 남의 정보
  hasMoreFollower: true,
  hasMoreFollowing: true,
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  follow(state, payload) {
    state.me.Followings.push({ id: payload.userId });
  },
  removeFollower(state, payload) {
    let index = state.followerList.findIndex(v => v.id === payload.userId);
    state.followerList.splice(index, 1);
    index = state.me.Followers.findIndex(v => v.id === payload.userId);
    state.me.Followers.splice(index, 1);
  },
  removeFollowing(state, payload) {
    let index = state.followingList.findIndex(v => v.id === payload.userId);
    state.followingList.splice(index, 1);
    index = state.me.Followings.findIndex(v => v.id === payload.userId);
    state.me.Followings.splice(index, 1);
  },
  loadFollowings(state, payload) {
    state.followingList = state.followingList.concat(payload);
    state.hasMoreFollowing = payload.length === 3;
  },
  loadFollowers(state, payload) {
    state.followerList = state.followerList.concat(payload);
    state.hasMoreFollower = payload.length === 3;
  },
};

export const actions = {
  async loadUser({ state, commit }) {
    console.log('loadUser');
    try {
      const res = await this.$axios.get('/user', {
        withCredentials: true,
      });
      console.log(res.data);
      commit('setMe', res.data);
      console.log(state);
    } catch (err) {
      console.error(err);
    }
  },
  signUp({ commit, state }, payload) {
    this.$axios.post('/user', {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    }, {
      withCredentials: true,
    })
      .then((res) => {
        commit('setMe', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  logIn({ commit }, payload) {
    this.$axios.post('/user/login', {
      email: payload.email,
      password: payload.password,
    }, {
      withCredentials: true,
    })
      .then((res) => {
        commit('setMe', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  logOut({ commit }) {
    this.$axios.post('/user/logout', {}, {
      withCredentials: true,
    })
      .then((data) => {
        commit('setMe', null);
      })
      .catch((err) => {
        console.error(err);
      });

  },
  changeNickname({ commit }, payload) {
    this.$axios.patch(`/user/nickname`, { nickname: payload.nickname }, {
      withCredentials: true,
    })
      .then(() => {
        commit('changeNickname', payload);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  follow({ commit }, payload) {
    this.$axios.post(`/user/${payload.userId}/follow`, {}, {
      withCredentials: true,
    })
      .then((res) => {
        commit('follow', {
          userId: payload.userId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  unfollow({ commit }, payload) {
    this.$axios.delete(`/user/${payload.userId}/follow`, {
      withCredentials: true,
    })
      .then((res) => {
        commit('removeFollowing', {
          userId: payload.userId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  loadFollowers({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      this.$axios.get(`/user/${state.me.id}/followers?limit=3&offset=${state.followerList.length}`, {
        withCredentials: true,
      })
        .then((res) => {
          commit('loadFollowers', res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  loadFollowings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      this.$axios.get(`/user/${state.me.id}/followings?limit=3&offset=${state.followingList.length}`, {
        withCredentials: true,
      })
        .then((res) => {
          commit('loadFollowings', res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  banFollower({ commit }, payload) {
    this.$axios.delete(`/user/${payload.userId}/follower`, {
      withCredentials: true,
    })
      .then((res) => {
        commit('removeFollower', {
          userId: payload.userId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

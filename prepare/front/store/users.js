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
  setOther(state, payload) {
    state.userInfo = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  following(state, payload) {
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
    if (payload.offset === 0) {
      state.followingList = payload.data;
    } else {
      state.followingList = state.followingList.concat(payload.data);
    }
    state.hasMoreFollowing = payload.data.length === 3;
  },
  loadFollowers(state, payload) {
    if (payload.offset === 0) {
      state.followerList = payload.data;
    } else {
      state.followerList = state.followerList.concat(payload.data);
    }
    state.hasMoreFollower = payload.data.length === 3;
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
  async loadOther({ state, commit }, payload) {
    try {
      const res = await this.$axios.get(`/user/${payload.userId}`);
      console.log(res.data);
      commit('setOther', res.data);
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
        commit('following', {
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
      const offset = payload && payload.offset === 0 ? 0 : state.followerList.length;
      return this.$axios.get(`/user/${state.me.id}/followers?limit=3&offset=${offset}`, {
        withCredentials: true,
      })
        .then((res) => {
          commit('loadFollowers', {
            data: res.data,
            offset,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  loadFollowings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      const offset = payload && payload.offset === 0 ? 0 : state.followingList.length;
      return this.$axios.get(`/user/${state.me.id}/followings?limit=3&offset=${offset}`, {
        withCredentials: true,
      })
        .then((res) => {
          commit('loadFollowings', {
            data: res.data,
            offset,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  removeFollower({ commit }, payload) {
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

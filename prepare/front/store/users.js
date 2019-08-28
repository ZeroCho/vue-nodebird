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
  unfollow(state, payload) {
    const index = state.me.Followings.findIndex(v => v.id === payload.userId);
    state.me.Followings.splice(index, 1);
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex(v => v.id === payload.id);
    state.followerList.splice(index, 1);
  },
  removeFollowing(state, payload) {
    const index = state.followingList.findIndex(v => v.id === payload.id);
    state.followingList.splice(index, 1);
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
    commit('changeNickname', payload);
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
        commit('unfollow', {
          userId: payload.userId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  removeFollowing({ commit }, payload) {
    // 비동기 요청
    commit('removeFollowing', payload);
  },
  removeFollower({ commit }, payload) {
    commit('removeFollower', payload);
  },
  loadFollowers({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      commit('loadFollowers');
    }
  },
  loadFollowings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      commit('loadFollowings');
    }
  },
};

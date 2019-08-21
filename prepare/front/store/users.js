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
};

export const actions = {
  signUp({ commit }, payload) {
    commit('setMe', payload);
  },
  logIn({ commit }, payload) {
    commit('setMe', payload);
  },
  logOut({ commit }) {
    commit('setMe', null);
  },
  changeNickname({ commit }, payload) {
    commit('changeNickname', payload);
  },
};

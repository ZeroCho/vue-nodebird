<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field
              v-model="nickname"
              label="닉네임"
              :rules="nicknameRules"
              required
            />
            <v-btn dark color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :users="followingList" :remove="removeFollowing" />
          <v-btn v-if="hasMoreFollowing" dark color="blue" style="width: 100%" @click="loadMoreFollowings">더보기</v-btn>
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn v-if="hasMoreFollower" dark color="blue" style="width: 100%" @click="loadMoreFollowers">더보기</v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import FollowList from '~/components/FollowList';

  export default {
    components: {
      FollowList,
    },
    data() {
      return {
        valid: false,
        nickname: '',
        nicknameRules: [
          v => !!v || '닉네임을 입력하세요.',
        ],
      };
    },
    computed: {
      followerList() {
        return this.$store.state.users.followerList;
      },
      followingList() {
        return this.$store.state.users.followingList;
      },
      hasMoreFollowing() {
        return this.$store.state.users.hasMoreFollowing;
      },
      hasMoreFollower() {
        return this.$store.state.users.hasMoreFollower;
      },
    },
    fetch({ store }) {
      return Promise.all([
        store.dispatch('users/loadFollowings', { offset: 0 }),
        store.dispatch('users/loadFollowers', { offset: 0 }),
      ]);
    },
    methods: {
      onChangeNickname() {
        this.$store.dispatch('users/changeNickname', {
          nickname: this.nickname,
        });
      },
      removeFollowing(userId) {
        this.$store.dispatch('users/unfollow', { userId });
      },
      removeFollower(userId) {
        this.$store.dispatch('users/removeFollower', { userId });
      },
      loadMoreFollowers() {
        this.$store.dispatch('users/loadFollowers');
      },
      loadMoreFollowings() {
        this.$store.dispatch('users/loadFollowings');
      },
    },
    head() {
      return {
        title: '프로필',
      };
    },
    middleware: 'authenticated',
  };
</script>

<style>

</style>

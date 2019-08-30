<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        {{other.nickname}}
        <v-btn @click="onLogOut">로그아웃</v-btn>
        <v-row>
          <v-col cols="4">{{other.Followings}} 팔로잉</v-col>
          <v-col cols="4">{{other.Followers}} 팔로워</v-col>
          <v-col cols="4">{{other.Posts}} 게시글</v-col>
        </v-row>
      </v-container>
    </v-card>
    <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
  </v-container>
</template>
<script>
  import PostCard from '~/components/PostCard';

  export default {
    components: {
      PostCard,
    },
    computed: {
      mainPosts() {
        return this.$store.state.posts.mainPosts;
      },
      other() {
        return this.$store.state.users.userInfo;
      },
    },
    fetch({ store, params }) {
      store.dispatch('users/loadOther', {
        userId: params.id,
      });
      return store.dispatch('posts/loadUserPosts', {
        userId: params.id,
        reset: true,
      });
    },
    head() {
      return {
        title: 'NodeBird',
      };
    },
  };
</script>

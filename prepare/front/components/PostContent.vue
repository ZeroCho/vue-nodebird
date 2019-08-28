<template>
  <div>
    <post-images :images="post.Images || []" />
    <v-card-title>
      <h3 class="headline mb-0">
        <nuxt-link :to="'/user/' + post.User.id">{{post.User.nickname}}</nuxt-link>
        <v-btn v-if="!followed && me" small @click="onFollow">팔로우</v-btn>
        <v-btn v-else-if="followed && me" small @click="onUnfollow">언팔로우</v-btn>
      </h3>
    </v-card-title>
    <v-card-text>
      <div>{{post.content}}</div>
    </v-card-text>
  </div>
</template>

<script>
  import PostImages from './PostImages';

  export default {
    components: {
      PostImages,
    },
    props: {
      post: {
        type: Object,
      },
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      followed() {
        return this.me && this.me.Followings && this.me.Followings.find(v => v.id === this.post.User.id)
      }
    },
    methods: {
      onFollow() {
        this.$store.dispatch('users/follow', {
          userId: this.post.User.id,
        });
      },
      onUnfollow() {
        this.$store.dispatch('users/unfollow', {
          userId: this.post.User.id,
        });
      },
    },
  };
</script>

<style scoped>
  a {
    text-decoration: none;
    color: inherit;
  }
</style>

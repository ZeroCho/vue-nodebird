<template>
  <v-container v-if="post">
    <post-card :post="post" />
  </v-container>
  <div v-else>
    해당 아이디의 게시글이 존재하지 않습니다.
  </div>
</template>

<script>
  import PostCard from '~/components/PostCard';

  export default {
    components: {
      PostCard,
    },
    computed: {
      post() {
        return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10));
      },
    },
  };
</script>

<style>

</style>

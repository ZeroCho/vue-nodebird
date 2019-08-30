<template>
  <v-container>
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
    },
    fetch({ store, params }) {
      return store.dispatch('posts/loadHashtagPosts',  {
        hashtag: params.id,
        reset: true,
      });
    },
    methods: {},
    head() {
      return {
        title: 'NodeBird',
      };
    },
  };
</script>

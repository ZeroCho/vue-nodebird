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
    fetch({ store }) {
      store.dispatch('posts/loadPosts');
    },
    methods: {},
    head() {
      return {
        title: 'NodeBird',
      };
    },
  };
</script>

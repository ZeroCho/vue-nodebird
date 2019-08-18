<template>
  <v-container>
    <post-form v-if="me" />
    <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
  </v-container>
</template>
<script>
  import PostCard from '../components/PostCard';
  import PostForm from '../components/PostForm';

  export default {
    components: {
      PostForm,
      PostCard,
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      mainPosts() {
        return this.$store.state.posts.mainPosts;
      }
    },
    methods: {},
    head() {
      return {
        title: 'NodeBird',
      };
    },
  };
</script>

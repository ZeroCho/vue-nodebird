<template>
  <v-container>
    <div>
      <post-card />
      <post-card />
      <post-card />
      <post-card />
      <post-card />
    </div>
  </v-container>
</template>

<script>
  import PostCard from '~/components/PostCard';

  export default {
    components: {
      PostCard,
    },
    data() {
      return {
        name: 'Nuxt.js',
      }
    },
  }
</script>

<style>

</style>

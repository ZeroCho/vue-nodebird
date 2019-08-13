<template>
  <v-container>
    <post-card v-for="p in posts" :key="p.title" :post="p" />
  </v-container>
</template>
<script>
  import PostCard from '../components/PostCard';

  export default {
    components: {
      PostCard,
    },
    data() {
      return {
        posts: [{
          content: 'abcdef',
          User: {
            nickname: '제로초',
          },
          Images: [{
            src: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
          }],
        }, {
          content: 'awefafds',
          User: {
            nickname: '제로초',
          },
        }, {
          content: 'vafwaefwa',
          User: {
            nickname: '제로초',
          },
          Images: [{
            src: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
          }, {
            src: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
          }],
        }, {
          content: 'qweqrtq',
          User: {
            nickname: '제로초',
          },
          Images: [{
            src: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
          }, {
            src: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
          }, {
            src: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
          }],
        }, {
          content: 'jrqwrqw',
          User: {
            nickname: '제로초',
          },
        }],
      };
    },
    methods: {},
    head() {
      return {
        title: 'NodeBird',
      };
    },
  };
</script>

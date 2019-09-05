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
      }
    },
    fetch({ store, params }) {
      return store.dispatch('posts/loadPost', params.id);
    },
    head() {
      return {
        meta: [{
          name: 'description', content: this.post.content,
        }, {
          property: 'og:title', content: `${this.post.User.nickname}님의 게시글`,
        }, {
          property: 'og:description', content: this.post.content,
        }, {
          property: 'og:image', content: this.post.Images[0] ? this.post.Images[0].src : 'https://vue.nodebird.com/vue-nodebird.png',
        }, {
          property: 'og:url', content: `https://vue.nodebird.com/post/${this.post.id}`,
        }],
      }
    }
  }
</script>

<style></style>

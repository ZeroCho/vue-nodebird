<template>
  <v-flex xs12 style="margin-bottom: 20px">
    <v-card>
      <post-images :images="post.Images || []" />
      <v-card-title>
        <h3 class="headline mb-0">
          <nuxt-link :to="'/user/' + post.User.id">{{post.User.nickname}}</nuxt-link>
        </h3>
      </v-card-title>
      <v-card-text>
        <div>{{post.content}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="orange" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background: white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <v-btn text color="orange" @click="onEditPost">수정</v-btn>
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>
    <template v-if="commentOpened">
      <comment-form v-if="me" :post-id="post.id" />
      <v-list>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="teal">
            <span class="white--text headline">{{c.User.nickname[0]}}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{c.User.nickname}}</v-list-item-title>
            <v-list-item-subtitle>{{c.content}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-flex>
</template>

<script>
  import PostImages from './PostImages';
  import CommentForm from './CommentForm';

  export default {
    components: {
      PostImages,
      CommentForm,
    },
    props: {
      post: Object,
    },
    data() {
      return {
        commentOpened: false,
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      hasMorePost() {
        return this.$store.state.posts.hasMorePost;
      },
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
      onToggleComment() {
        this.commentOpened = !this.commentOpened;
      },
      onRemovePost() {
        this.$store.dispatch('posts/remove', {
          id: this.post.id,
        });
      },
      onEditPost() {

      },
      onScroll() {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (this.hasMorePost) {
            this.$store.dispatch('posts/loadPosts');
          }
        }
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

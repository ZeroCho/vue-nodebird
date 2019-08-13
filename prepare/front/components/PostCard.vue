<template>
  <v-flex xs12 style="margin-bottom: 20px">
    <v-card>
      <post-images :images="post.Images || []" />
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{post.User.nickname}}</h3>
          <div>{{post.content}}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">
          <v-icon>share</v-icon>
        </v-btn>
        <v-btn flat color="orange">
          <v-icon>thumb_up</v-icon>
        </v-btn>
        <v-btn flat color="orange" @click="onToggleComment">
          <v-icon>comment</v-icon>
        </v-btn>
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on }">
            <v-btn flat color="orange">
              <v-icon>more_horiz</v-icon>
            </v-btn>
          </template>
          <div>
            <v-btn color="red">삭제</v-btn>
            <v-btn flat color="orange">수정</v-btn>
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>
    <template v-if="commentOpened">
      <comment-form />
      <v-list>
        <template v-for="c in comments">
          <v-list-tile :key="c.content" avatar>
            <v-list-tile-avatar color="indigo">
              <span class="white--text headline">{{c.User.nickname[0]}}</span>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{c.User.nickname}}</v-list-tile-title>
              <v-list-tile-sub-title>{{c.comment}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
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
    data() {
      return {
        commentOpened: false,
        comments: [{
          User: {
            nickname: '제로초',
          },
          comment: '나는 바보다!!!!',
        },
          {
            User: {
              nickname: '제로초',
            },
            comment: '나는 짱이다!!!!',
          }],
      };
    },
    props: {
      post: Object,
    },
    methods: {
      onToggleComment() {
        this.commentOpened = !this.commentOpened;
      },
    },
  };
</script>

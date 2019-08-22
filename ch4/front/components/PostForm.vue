<template>
  <v-card style="margin-bottom: 20px">
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea
          v-model="content"
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있었나요?"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          :rules="[v => !!v.trim() || '내용을 입력하세요.']"
          @input="onChangeTextarea"
        />
        <v-btn type="submit" color="green" absolute right>짹짹</v-btn>
        <v-btn>이미지 업로드</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        valid: false,
        hideDetails: true,
        successMessages: '',
        success: false,
        content: '',
      };
    },
    computed: {
      ...mapState('users', ['me']),
    },
    methods: {
      onChangeTextarea(value) {
        if (value.length) {
          this.hideDetails = true;
          this.success = false;
          this.successMessages = '';
        }
      },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('posts/add', {
            content: this.content,
            User: {
              nickname: this.me.nickname,
            },
            Comments: [],
            Images: [],
            id: Date.now(),
            createdAt: Date.now(),
          })
            .then(() => {
              this.content = '';
              this.hideDetails = false;
              this.success = true;
              this.successMessages = '게시글 등록 성공!';
            })
            .catch(() => {

            });
        }
      },
    },
  };
</script>

<style>

</style>

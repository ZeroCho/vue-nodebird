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
          :rules="[v => !!v.trim() || '내용을 입력하세요']"
          @input="onChangeTextarea"
        />
        <v-btn>이미지 업로드</v-btn>
        <v-btn color="primary" type="submit" absolute right>짹짹</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        content: '',
        success: false,
        successMessages: '',
        hideDetails: true,
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
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
            id: Date.now(),
            content: this.content,
            User: {
              nickname: this.me.nickname,
            },
            Comments: [],
          })
            .then(() => {
              this.content = '';
              this.hideDetails = false;
              this.success = true;
              this.successMessages = '게시되었습니다!';
            });
        }
      },
    },
  };
</script>

<style>

</style>

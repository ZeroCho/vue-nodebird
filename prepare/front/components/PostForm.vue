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
        <v-btn color="primary" type="submit" absolute right>짹짹</v-btn>
        <input ref="imageInput" type="file" hidden multiple @change="onChangeImages">
        <v-btn @click="onClickImageUpload">이미지 업로드</v-btn>
        <div>
          <div v-for="(p, i) in imagePaths" :key="p" style="display: inline-block">
            <img :src="`http://localhost:3085/${p}`" style="width: 200px" :alt="p" />
            <div>
              <button @click="onRemoveImage(i)" type="button">제거</button>
            </div>
          </div>
        </div>
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
        fakeImage: false,
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      imagePaths() {
        return this.$store.state.posts.imagePaths;
      },
    },
    methods: {
      onChangeTextarea(value) {
        if (value.length) {
          this.hideDetails = true;
          this.success = false;
          this.successMessages = '';
        } else {
          this.hideDetails = false;
        }
      },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          const images = this.fakeImage ? [{ src: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg' }]: [];
          this.$store.dispatch('posts/add', {
            id: Date.now(),
            content: this.content,
            User: {
              nickname: this.me.nickname,
            },
            Comments: [],
            Images: images,
          })
            .then(() => {
              this.content = '';
              this.hideDetails = false;
              this.success = true;
              this.successMessages = '게시되었습니다!';
            });
        }
      },
      onRemoveImage(index) {
        this.$store.commit('posts/removeImagePath', index);
      },
      onClickImageUpload() {
        this.$refs.imageInput.click();
      },
      onChangeImages(e) {
        console.log(e.target.files, e.target.files.forEach);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
          imageFormData.append('image', f);
        });
        this.$store.dispatch('posts/uploadImages', imageFormData);
      },
    },
  };
</script>

<style>

</style>

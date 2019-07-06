<template>
  <v-container>
    <v-subheader>내 프로필</v-subheader>
    <v-form v-model="valid" @submit.prevent="onChangeNickname">
      <v-text-field
        v-model="nickname"
        label="닉네임"
        :rules="nicknameRules"
        required
      />
      <v-btn color="blue" class="white--text" type="submit" :disabled="!valid">
        수정
      </v-btn>
    </v-form>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        valid: false,
        nickname: '',
        nicknameRules: [
          v => !!v || '닉네임은 필수입니다.',
        ],
      };
    },
    methods: {
      onChangeNickname() {

      }
    },
    head() {
      return {
        title: '프로필 | NodeBird',
      }
    }
  }
</script>

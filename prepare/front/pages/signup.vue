<template>
  <div>
    <v-subheader>회원가입</v-subheader>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
      <v-container>
        <v-text-field
          v-model="email"
          label="이메일"
          type="email"
          :rules="emailRules"
          required
        />
        <v-text-field
          v-model="password"
          label="비밀번호"
          type="password"
          :rules="passwordRules"
          required
        />
        <v-text-field
          v-model="passwordCheck"
          label="비밀번호 확인"
          type="password"
          :rules="passwordCheckRules"
          required
        />
        <v-text-field
          v-model="nickname"
          label="닉네임"
          :rules="nicknameRules"
          required
        />
        <v-checkbox
          v-model="terms"
          required
          :rules="[v => !!v || '약관에 동의해야 합니다.']"
          label="제로초 말을 잘 듣을 것을 약속합니다."
        />
        <v-btn color="green" class="white--text" type="submit" :disabled="!valid">
          가입
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        valid: false,
        email: '',
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        nickname: '',
        nicknameRules: [
          v => !!v || '닉네임은 필수입니다.',
        ],
        password: '',
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
        passwordCheck: '',
        passwordCheckRules: [
          v => !!v || '비밀번호 확인은 필수입니다.',
          v => v === this.password || '비밀번호가 일치하지 않습니다.',
        ],
        terms: false,
      };
    },
    methods: {
      onSubmitForm() {
        this.$refs.form.validate();
        console.log(this.valid);
      },
    },
    head() {
      return {
        title: '회원가입 | NodeBird',
      };
    },
  };
</script>

<style>
  .v-messages__message {
    color: red;
  }
</style>

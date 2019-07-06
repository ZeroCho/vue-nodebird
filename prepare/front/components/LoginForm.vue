<template>
  <v-container>
    <v-form ref="form" @submit.prevent="onSubmitForm" v-model="valid">
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
      <v-btn
        class="white--text"
        color="green"
        type="submit"
        :disabled="!valid"
      >
        로그인
      </v-btn>
      <v-btn
        nuxt
        to="/signup"
        type="submit"
      >
        회원가입
      </v-btn>
    </v-form>
  </v-container>
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
        password: '',
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
      };
    },
    methods: {
      onSubmitForm() {
        this.$refs.form.validate();
        console.log(this.valid);
      },
    },
  };
</script>

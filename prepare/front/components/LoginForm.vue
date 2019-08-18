<template>
  <v-container>
    <v-card v-if="!me">
      <v-form ref="form" @submit.prevent="onSubmitForm" v-model="valid">
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
        </v-container>
      </v-form>
    </v-card>
    <v-card v-else>
      <v-container>
        {{me.nickname}} 로그인됨
        <v-btn @click="onLogOut">로그아웃</v-btn>
      </v-container>
    </v-card>
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
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/logIn', {
            email: this.email,
            nickname: '제로초',
          });
        }
      },
      onLogOut() {
        this.$store.dispatch('users/logOut');
      },
    },
  };
</script>

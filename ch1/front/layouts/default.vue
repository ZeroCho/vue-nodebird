<template>
  <div>
    <v-toolbar dark color="green">
      <v-toolbar-items>
        <v-toolbar-title :style="{ display: 'flex', alignItems: 'center' }">
          <nuxt-link to="/">NodeBird</nuxt-link>
        </v-toolbar-title>
        <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
          <div>프로필</div>
        </v-btn>
        <v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
          <div>회원가입</div>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout>
      <v-flex xs12 md4>
        <login-form />
      </v-flex>
      <v-flex xs12 md8>
        <nuxt />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import LoginForm from '../components/LoginForm';

  export default {
    components: {
      LoginForm,
    },
  };
</script>

<style scoped>
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
</style>

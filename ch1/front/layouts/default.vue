<template>
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/">NodeBird</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" :style="{ display: 'flex', alignItems: 'center' }" />
          <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row no-gutters>
      <v-col cols="12" xs="12" md="4">
        <login-form />
      </v-col>
      <v-col cols="12" xs="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
  import LoginForm from '~/components/LoginForm';

  export default {
    head() {
      return {
        title: 'NodeBird',
      };
    },
    components: {
      LoginForm,
    },
    computed: {
      name() {
        return this.$store.state.posts.name;
      },
    },
    methods: {
      onChangeName() {
        this.$store.commit('posts/BYE');
      }
    }
  };
</script>

<style scoped>
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
</style>

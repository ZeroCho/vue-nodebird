<template>
  <div>
    <h1>Hello world!</h1>
    <nuxt-link to="/profile">프로필</nuxt-link>
    <nuxt-link to="/signup">회원가입</nuxt-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {},
    head() {
      return {
        title: 'NodeBird',
      };
    },
  };
</script>

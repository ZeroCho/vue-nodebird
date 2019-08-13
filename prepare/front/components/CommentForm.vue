<template>
  <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
    <v-textarea
      solo
      name="input-7-4"
      label="댓글 달기"
      v-model="value"
      auto-grow
    ></v-textarea>
    <v-btn color="green" dark>삐약</v-btn>
  </v-form>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        value: 'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.'
      };
    },
    methods: {
      onSubmitForm() {

      },
    },
  };
</script>

<style>

</style>

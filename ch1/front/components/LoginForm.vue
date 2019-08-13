<template>
  <v-container>
    <v-form>
      <v-text-field
        label="이메일"
        type="email"
        required
      />
      <v-text-field
        label="비밀번호"
        type="password"
        required
      />
      <v-btn type="submit" color="green">로그인</v-btn>
    </v-form>
  </v-container>
</template>

<script>
  export default {

  }
</script>

<style>

</style>

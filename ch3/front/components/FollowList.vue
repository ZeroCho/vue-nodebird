<template>
  <v-list-tile>
    <ul>
      <li v-for="user in users" :key="user.id">
        <span>{{user.nickname}}</span>
        <v-icon @click="remove(user.id)">mdi-minus-circle-outline</v-icon>
      </li>
    </ul>
  </v-list-tile>
</template>

<script>
  export default {
    props: {
      users: {
        type: Array,
        required: true,
      },
      remove: {
        type: Function,
        required: true,
      }
    },
  }
</script>

<style>

</style>

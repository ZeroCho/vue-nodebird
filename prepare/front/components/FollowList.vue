<template>
  <v-list>
    <v-col v-for="l in list" :key="l.nickname" cols="12" md="4" style="display: inline-block">
      <v-list-item>
        <v-list-item-avatar color="indigo">
          <span class="white--text headline">{{ l.nickname[0] }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ l.nickname }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="onRemoveUser(l.id)">mdi-minus-circle-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-col>
  </v-list>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        required: true,
      },
      onRemoveUser: {
        type: Function,
        required: true,
      },
    },
  };
</script>

<template>
  <div>
    <v-list-tile v-for="l in list" :key="l.nickname" avatar>
      <v-list-tile-avatar color="indigo">
        <span class="white--text headline">{{ l.nickname[0] }}</span>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ l.nickname }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon @click="onRemoveUser(l.id)">remove_circle_outline</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
          nickname: '제로초',
        }, {
          nickname: '네로',
        }, {
          nickname: '히어로',
        }],
      };
    },
    methods: {
      onRemoveUser(id) {
        console.log(id);
      },
    },
  };
</script>

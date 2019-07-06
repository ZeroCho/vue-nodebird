<template>
  <v-container>
    <v-flex v-for="p in posts" xs12 style="margin-bottom: 20px">
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2"
        />
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div> 12345 </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        posts: [1, 2, 3, 4, 5],
      };
    },
    methods: {},
    head() {
      return {
        title: 'NodeBird',
      };
    },
  };
</script>

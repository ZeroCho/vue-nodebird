<template>
  <div v-if="images.length === 0"></div>
  <div v-else-if="images.length === 1">
    <v-img
      :src="`http://localhost:3085/${images[0].src}`"
      aspect-ratio="2"
      contain
      @click="zoomImages"
    />
    <image-zoom v-if="imageZoomed" :images="images" :close-modal="closeModal" />
  </div>
  <div v-else-if="images.length === 2" style="display: flex">
    <v-img
      :src="`http://localhost:3085/${images[0].src}`"
      aspect-ratio="2"
      contain
      style="flex: 1"
      @click="zoomImages"
    />
    <v-img
      :src="`http://localhost:3085/${images[1].src}`"
      aspect-ratio="2"
      contain
      style="flex: 1"
      @click="zoomImages"
    />
    <image-zoom v-if="imageZoomed" :images="images" :close-modal="closeModal" />
  </div>
  <div v-else style="display: flex">
    <v-img
      style="flex: 1"
      :src="`http://localhost:3085/${images[0].src}`"
      aspect-ratio="2"
      contain
      @click="zoomImages"
    />
    <div style="flex: 1;align-items: center;justify-content: center;display:flex" @click="zoomImages">
      <v-icon>mdi-dots-horizontal</v-icon>
    </div>
    <image-zoom v-if="imageZoomed" :images="images" :close-modal="closeModal" />
  </div>
</template>

<script>
  import ImageZoom from './ImageZoom';

  export default {
    components: {
      ImageZoom,
    },
    props: {
      images: Array,
    },
    data() {
      return {
        imageZoomed: false,
      };
    },
    methods: {
      zoomImages() {
        this.imageZoomed = true;
      },
      closeModal() {
        this.imageZoomed = false;
      }
    },
  };
</script>

<style>

</style>

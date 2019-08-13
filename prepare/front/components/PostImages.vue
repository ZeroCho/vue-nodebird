<template>
  <div v-if="images.length === 0"></div>
  <div v-else-if="images.length === 1">
    <v-img
      :src="images[0].src"
      aspect-ratio="2"
      @click="zoomImages"
    />
    <image-zoom v-if="imageZoomed" :images="images" :close-modal="closeModal" />
  </div>
  <div v-else-if="images.length === 2" style="display: flex">
    <v-img
      :src="images[0].src"
      aspect-ratio="2"
      style="flex: 1"
      @click="zoomImages"
    />
    <v-img
      :src="images[1].src"
      aspect-ratio="2"
      style="flex: 1"
      @click="zoomImages"
    />
    <image-zoom v-if="imageZoomed" :images="images" :close-modal="closeModal" />
  </div>
  <div v-else style="display: flex">
    <v-img
      style="flex: 1"
      :src="images[0].src"
      aspect-ratio="2"
      @click="zoomImages"
    />
    <div style="flex: 1;align-items: center;justify-content: center;display:flex" @click="zoomImages">
      <v-icon>more_horiz</v-icon>
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

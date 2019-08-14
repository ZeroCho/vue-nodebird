<template>
  <div id="image-zoom">
    <header>
      <h1>상세 이미지</h1>
      <v-icon id="close-btn" @click="closeModal">mdi-close</v-icon>
    </header>
    <div id="slick-wrapper">

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      closeModal: Function,
    },
  };
</script>

<style scoped>
  #image-zoom {
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #image-zoom header {
    height: 44px;
    background: white;
    position: relative;
    padding: 0;
    text-align: center;
  }

  #image-zoom header h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }

  #close-btn {
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
  }

  #slick-wrapper {
    height: calc(100% - 44px);
    background: #090909;
  }
</style>

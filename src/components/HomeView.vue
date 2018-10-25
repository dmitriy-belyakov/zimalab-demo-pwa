<!--<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell&#45;&#45;3-col mdl-cell mdl-cell&#45;&#45;1-col-tablet mdl-cell&#45;&#45;hide-phone"></div>
      <div class="mdl-cell mdl-cell&#45;&#45;6-col mdl-cell&#45;&#45;4-col-phone">
          ALLO
      </div>
    </div>
    <router-link class="add-picture-button mdl-button mdl-js-button mdl-button&#45;&#45;fab mdl-button&#45;&#45;colored" to="/post">
      <i class="material-icons">add</i>
    </router-link>
  </div>
</template>-->

<script>
  /* eslint-disable no-unused-vars */

  import { QrcodeReader } from 'vue-qrcode-reader'
  export default {
    components: { QrcodeReader }
  }
</script>

<!--<style scoped>
  .add-picture-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 998;
  }
  .image-card {
    position: relative;
    margin-bottom: 8px;
  }
  .image-card__picture > img {
    width:100%;
  }
  .image-card__comment {
    position: absolute;
    bottom: 0;
    height: 52px;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.5);
  }
  .image-card__comment > span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
</style>-->

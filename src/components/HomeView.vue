<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <qrcode-reader></qrcode-reader>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */

  import { QrcodeReader } from 'vue-qrcode-reader'
  export default {
    components: { QrcodeReader }
  }
</script>

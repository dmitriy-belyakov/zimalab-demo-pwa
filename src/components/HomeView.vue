<!--suppress ALL -->
<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <qrcode-reader @decode="onDecode">

        </qrcode-reader>
        <div v-show="decodeString !== ''">
          {{decodeString}}
          <input type="hidden" id="testing-code" :value="decodeString">
        </div>
        <button v-show="!isUrlAbsolute(decodeString) && decodeString != ''" v-on:click="copyTestingCode">Copy text</button>
        <a v-show="isUrlAbsolute(decodeString)" v-bind:href="decodeString">Open site</a>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */

  import { QrcodeReader } from 'vue-qrcode-reader'
  export default {
    data: function () {
      return {
        decodeString: ''
      }
    },
    components: {QrcodeReader},
    methods: {
      onDecode (decodedString) {
        this.decodeString = decodedString
      },
      copyTestingCode () {
        let testingCodeToCopy = document.querySelector('#testing-code')
        testingCodeToCopy.setAttribute('type', 'text')
        testingCodeToCopy.select()

        try {
          var successful = document.execCommand('copy')
          var msg = successful ? 'successful' : 'unsuccessful'
        } catch (err) {
          alert('Oops, unable to copy')
        }
        testingCodeToCopy.setAttribute('type', 'hidden')
      },
      isUrlAbsolute (url) {
        return (url.indexOf('://') > 0 || url.indexOf('//') === 0)
      }
    }
  }
</script>

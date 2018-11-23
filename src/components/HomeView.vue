<!--suppress ALL -->
<template>
    <div>
        <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
            <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
                <qrcode-reader v-if="showQRCodeReader" @decode="onDecode" @init="onInit"></qrcode-reader>
                <div v-show="decodeString !== ''">
                    <p class="decoded-string">{{decodeString}}</p>
                    <input type="hidden" id="testing-code" :value="decodeString">
                </div>
                <button v-show="!isUrlAbsolute(decodeString) && decodeString != ''" v-on:click="copyTestingCode" class="btn btn-primary">Copy text</button>
                <a v-show="isUrlAbsolute(decodeString)" v-bind:href="decodeString" class="btn btn-primary">Open site</a><br>
                <button @click="reScan()" v-show="!showQRCodeReader" class="btn btn-primary" style="margin-top: 20px">Make another scan</button>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable*/

    import { QrcodeReader } from 'vue-qrcode-reader'
    export default {
        data: function () {
            return {
                decodeString: '',
                showQRCodeReader: true
            }
        },
        components: {QrcodeReader},
        methods: {
            onDecode (decodedString) {
                this.decodeString = decodedString
                this.showQRCodeReader = false
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
            },
            async onInit (promise) {
                try {
                    await promise
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                        this.error = "ERROR: you need to grant camera access permisson"
                    } else if (error.name === 'NotFoundError') {
                        this.error = "ERROR: no camera on this device"
                        console.log('no camera on this device')
                    } else if (error.name === 'NotSupportedError') {
                        this.error = "ERROR: secure context required (HTTPS, localhost)"
                    } else if (error.name === 'NotReadableError') {
                        this.error = "ERROR: is the camera already in use?"
                        alert('ERROR: is the camera already in use?')
                    } else if (error.name === 'OverconstrainedError') {
                        this.error = "ERROR: installed cameras are not suitable"
                    } else if (error.name === 'StreamApiNotSupportedError') {
                        this.error = "ERROR: Stream API is not supported in this browser"
                    }
                }
            },
            reScan () {
                this.decodeString = ''
                this.showQRCodeReader = true
            }
        }
    }
</script>
<style>
    .decoded-string {
        font-size: 20px;
    }
</style>

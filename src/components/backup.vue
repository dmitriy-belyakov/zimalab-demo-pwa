<template>
    <div class="container">
        <croppa v-show="!croppedImage"
                v-model="croppa"
                :width="335"
                :height="335"
                :prevent-white-space="true"
                :show-remove-button="true"
                :zoom-speed="10"
                :show-loading="true">
        </croppa><br v-show="!croppedImage">

        <button v-if="croppa.img"
                @click="cropImage()"
                class="crop-button btn btn-primary">
                {{ croppedImage ? 'Crop another image' : 'Crop' }}
        </button><br>

        <img v-if="croppedImage" :src="croppedImage" :class="croppedImageClass">

        <div v-if="croppedImage" class="thumbnail-button-container"><br>
            <img :src="croppedImage" class="thumbnail-button big" @click="addCrop(500, 500)">
            <img :src="croppedImage" class="thumbnail-button middle" @click="addCrop(250, 250)">
            <img :src="croppedImage" class="thumbnail-button small" @click="addCrop(100, 100)">
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import Vue from 'vue'
    import Croppa from 'vue-croppa'

    Vue.use(Croppa)

    export default {
        data: function () {
            return {
                croppedImage: null,
                croppa: {},
                croppedImageSize: {
                    width: 335,
                    height: 335
                }
            }
        },
        computed: {
            croppedImageClass () {
                return 'cropped-image ' + 'crop' + this.croppedImageSize.width + '-' + this.croppedImageSize.height
            }
        },
        methods: {
            cropImage() {
                if (this.croppedImage) {
                    this.croppedImage = null
                    this.croppa.remove()
                } else {
                    this.croppedImage = this.croppa.generateDataUrl('image/jpeg', 0.8) // 80% compressed jpeg file
                }
            },
            addCrop (width, height) {
                this.croppedImageSize.width = width
                this.croppedImageSize.height = height
            }
        }
    }
</script>

<style>
    .container {
        margin-top: 10px;
    }

    .crop-button {
        margin-top: 10px;
        width: 335px;
    }
    
    .cropped-image {
        margin-top: 10px;
        width: 335px;
        height: 335px;
    }

    .crop500-500 {
        width: 500px;
        height: 500px;
    }

    .crop250-250 {
        width: 250px;
        height: 250px;
    }

    .crop100-100 {
        width: 100px;
        height: 100px;
    }

    .thumbnail-button-container {
        width: 335px;
        margin-left: auto;
        margin-right: auto;
    }

    .thumbnail-button {
        margin-right: 25px;
        margin-left: 25px;
    }

    .thumbnail-button.small {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .thumbnail-button.middle {
        width: 50px;
        height: 50px;
        cursor: pointer;
    }

    .thumbnail-button.big {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }
</style>

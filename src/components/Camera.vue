<template>
    <div class="container">
        <img :src="imageCropped" v-show="showCropped" class="croppedImage"/>
        <clip-loader v-show="loading"></clip-loader>
        <label class="uploadLabel">
            <input type="file" accept="image/*;capture=camera" @change="onFileChangeAndShowLoading">
            <span class="btn btn-primary">{{image ? 'Take another picture' : 'Take a picture'}}</span>
        </label>
        <!-- <p>Loading: {{ loading }}</p> -->
    </div>
</template>

<script>
/* eslint-disable */
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { setTimeout } from 'timers';
export default {  
    data: function () {
        return {
            image: null,
            showCropped: false,
            imageCropped: null,
            loading: false
        }
    },
    components: {
        ClipLoader
    },
    methods: {
        onFileChangeAndShowLoading (event) {
            this.showCropped = false
            this.loading = true
            setTimeout(() => {
                this.onFileChanged(event)
            }, 1);
        },
        onFileChanged (event) {
            this.showCropped = false
            this.image = event.target.files[0]
            var reader = new FileReader()
            reader.addEventListener("load", function () {
                this.showCropped = true;
                this.imageCropped = reader.result;
                this.loading = false
            }.bind(this), false);
            if (this.image) {
                if (/\.(jpe?g|png|gif)$/i.test(this.image.name)) {
                    reader.readAsDataURL(this.image)
                }
            }
        }
    }
}
</script>

<style>
    .container {
        width: 350px;
        height: 350px;
        margin-top: 10px;
    }
    .croppedImage {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .imageUpload .fileUploadButton {
        position: absolute;
        top: 200px;
    }
    label.uploadLabel input[type="file"] {
        position: absolute;
        top: -1000px;
    }
    label.uploadLabel span {
        margin-top: 10px;
    }
</style>
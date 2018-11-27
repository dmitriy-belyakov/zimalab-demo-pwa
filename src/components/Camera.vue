<template>
    <div class="container">
        <div v-for="img in imagesCropped" :key="img" v-show="showCropped" class="imageContainer">
            <b-img :src="img" v-show="showCropped" class="croppedImage"/>
        </div>
        <clip-loader v-show="loading"></clip-loader>
        <label class="uploadLabel" style="position: relative">
            <input multiple="multiple" type="file" accept="image/*;capture=camera" @change="onFileChangeAndShowLoading">
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
                loading: false,
                images: [],
                imagesCropped: []
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
                this.imagesCropped = []
                for (var i = 0; i < event.target.files.length; i++) {
                    this.addNewImage(event.target.files[i])
                }
            },
            addNewImage (image) {
                var reader = new FileReader()
                var self = this
                reader.addEventListener('load', function() {
                    self.imagesCropped.push(reader.result)
                    self.loading = false
                    self.showCropped = true;
                })
                if (this.image) {
                    if (/\.(jpe?g|png|gif)$/i.test(this.image.name)) {
                        reader.readAsDataURL(image)
                    }
                }                
            }
        }
    }
</script>

<style>
    .container {
        height: 100%;
        max-width: 600px;
        margin-top: 10px;
    }
    .imageContainer {
        height: 150px;
        width: 150px;
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 5px;
        margin-left: 5px;
    }
    .croppedImage {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    label.uploadLabel input[type="file"] {
        position: absolute;
        top: -9000px;
    }
    label.uploadLabel span {
        position: relative;
        margin-top: 10px;
    }
</style>
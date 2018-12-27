<template>
    <div class="container" @swipeleft="index -= 1" @swiperigth="index += 2">
        <draggable v-model="imagesCropped" @start="drag=true" @end="drag=false" :options="{handle: '.imageContainer', animation: 150}">
            <div v-for="(img, ind) in imagesCropped" :key="img" v-show="showCropped" class="imageContainer">
                <b-img src="/static/img/cross-icon.png" class="delete-button" @click="deleteImage(ind)"/>
                <b-img :src="img" v-show="showCropped" class="croppedImage" @click="index = ind"/>
            </div>
        </draggable><br>
        <p></p>
        <clip-loader v-show="showLoading"></clip-loader>

        <v-touch    @swipeleft="index + 1 >= imagesCropped.length ? index = 0 : index++"
                    @swiperight="index <= 0 ? index = (imagesCropped.length - 1) : index--">
            <vue-gallery-slideshow :images="imagesCropped" :index="index" @close="index = null"></vue-gallery-slideshow>
        </v-touch>

        <label class="uploadLabel" style="position: relative">
            <input multiple="multiple" type="file" accept="image/*;capture=camera" @change="onFileChanged">
            <span class="btn btn-primary" @click="$parent.playButtonSound()">{{image ? 'Take another picture' : 'Take a picture'}}</span>
        </label>
    </div>
</template>

<script>
    /* eslint-disable */
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    import { setTimeout } from 'timers'
    import VueGallerySlideshow from 'vue-gallery-slideshow'
    import Vue from 'vue'
    import draggable from 'vuedraggable'
    import VueTouch from 'vue-touch'

    Vue.use(VueTouch)

    export default {  
        data: function () {
            return {
                image: null,
                showCropped: false,
                imageCropped: null,
                loading: false,
                images: [],
                imagesCropped: [],
                index: null,
                imagesToUpload: 0,
                imagesUploaded: 0
            }
        },
        components: {
            ClipLoader,
            VueGallerySlideshow,
            draggable
        },
        computed: {
            showLoading () {
                return this.imagesUploaded < this.imagesToUpload
            }
        },
        methods: {
            deleteImage (index) {
                this.$parent.playButtonSound()
                this.imagesCropped.splice(index, 1)
            },
            onFileChanged (event) {
                this.showCropped = false
                this.loading = true
                // without setTimeout the above code will be waiting for loading
                setTimeout(() => {
                    this.showCropped = false
                    this.image = event.target.files[0]
                    this.imagesToUpload = event.target.files.length
                    this.imagesUploaded = 0
                    for (var i = 0; i < event.target.files.length; i++) {
                        this.addNewImage(event.target.files[i])
                    }                    
                }, 1);
            },
            addNewImage (image) {
                var reader = new FileReader()
                var self = this
                reader.addEventListener('load', function() {
                    self.imagesCropped.push(reader.result)
                    self.loading = false
                    self.showCropped = true
                    self.imagesUploaded++
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

<style scoped>
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
        position: relative;
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
    
    .imageContainer .delete-button {
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        top: 10%;
        left: 90%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        display: none;
    }
    
    .imageContainer:hover {
        cursor: pointer;
    }
    
    .imageContainer:hover .delete-button {
        display: inline;
    }
    
    .modal-slideshow__container__image {
        margin-top: 50px;
    }
    
    @media screen and (max-width: 600px) {
        .imageContainer .delete-button {
            display: inline;
        }
        .modal-slideshow__container__image {
            margin-top: 0px;
        }
    }
</style>
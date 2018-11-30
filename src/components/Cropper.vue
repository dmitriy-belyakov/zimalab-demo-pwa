<template>
    <div id="container">
        <label v-if="!imgSrc" class="uploadLabel" style="position: relative">
            <input type="file" name="image" accept="image/*;capture=camera" @change="setImage" />
            <span class="btn btn-primary" @click="$parent.playButtonSound()">{{image ? 'Take another picture' : 'Take a picture'}}</span>
        </label>
        <br v-if="!imgSrc">

        <div v-if="!cropImg && imgSrc" style="width: 335px; height: 335px; border: 1px solid gray; display: inline-block; border: 0px; margin-top: 10px;">
            <vue-cropper
                ref='cropper'
                :guides="true"
                :view-mode="2"
                drag-mode="crop"
                :auto-crop-area="0.5"
                :min-container-width="330"
                :min-container-height="330"
                :src="imgSrc"
                alt="Source Image"
                :img-style="{ 'width': '400px', 'height': '300px' }">
            </vue-cropper>
        </div><br v-if="!cropImg && imgSrc">

        <button v-if="imgSrc != ''"
                @click="cropImage"
                class="btn btn-primary crop-button">
                {{ cropImg ? 'Take another crop' : 'Crop'}}
        </button><br v-if="imgSrc != ''">

        <div :class="croppedImageContainerClass">
            <img v-if="cropImg" :src="cropImg" alt="Cropped Image" class="cropped-image"/>
        </div>

        <div v-if="cropImg" class="thumbnail-button-container"><br>
            <img :src="cropImg" class="thumbnail-button big" @click="addCrop(500, 500)">
            <img :src="cropImg" class="thumbnail-button middle" @click="addCrop(250, 250)">
            <img :src="cropImg" class="thumbnail-button small" @click="addCrop(100, 100)">
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import VueCropper from 'vue-cropperjs'

    export default {
        data() {
            return {
                imgSrc: '',
                cropImg: '',
                croppedImageSize: {
                    width: 335,
                    height: 335
                }
            }
        },
        components: {
            VueCropper,
        },
        computed: {
            croppedImageContainerClass () {
                if (this.cropImg) {
                    return 'image-container ' + 'crop' + this.croppedImageSize.width + '-' + this.croppedImageSize.height
                } else {
                    return 'image-container'
                }
            }
        },
        methods: {
            setImage(e) {
                const file = e.target.files[0]
                
                if (!this.cropImg) {
                    this.cropImg = ''
                }

                if (!file.type.includes('image/')) {
                    alert('Please select an image file')
                    return
                }

                if (typeof FileReader === 'function') {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                        this.imgSrc = event.target.result
                        // rebuild cropperjs with the updated source
                        this.$refs.cropper.replace(event.target.result)
                    }
                    reader.readAsDataURL(file)
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            },
            cropImage() {
                if (this.cropImg) {
                    this.imgSrc = ''
                    this.cropImg = ''
                } else {
                    // get image data for post processing, e.g. upload or setting image src
                    this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                }
            },
            addCrop (width, height) {
                this.croppedImageSize.width = width
                this.croppedImageSize.height = height
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .crop-button {
        margin-top: 10px;
    }    
    
    .cropped-image {
        width: 300px;
        height: 100%;
    }

    label.uploadLabel input[type="file"] {
        position: absolute;
        top: -9000px;
        margin-top: 10px;
    }
    
    label.uploadLabel span {
        position: relative;
        margin-top: 10px;
    }

    .image-container {
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
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

    .crop100-100 .cropped-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .crop250-250 .cropped-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .crop500-500 .cropped-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
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
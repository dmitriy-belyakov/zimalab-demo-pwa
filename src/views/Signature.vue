<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <div class="col-12 mt-2">
                    <vue-signature class="signature" ref="signature" :sigOption="option" :w="'90%'" :h="'400px'"></vue-signature>
                </div>

                <div class="button_container">
                    <button class="btn btn-outline-primary float-left" @click="save">Save</button>
                        <button class="btn btn-outline-primary float-left" @click="clear">Clear</button>
                    <button class="btn btn-outline-primary float-left" @click="undo">Undo</button>
                    <button class="btn btn-outline-primary float-left" @click="addWaterMark">Add watermark</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: 'Signature',
        data: function () {
            return {
                option: {
                    penColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgb(255,255,255)'
                },
                lastUrl: ''
            }
        },
        methods: {
            save () {
                this.$parent.playButtonSound()
                var _this = this
                var png = _this.$refs.signature.save()
                _this.lastUrl = png
                /* eslint-disable */
                var url = this.lastUrl.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
                var link = document.createElement('a')
                
                link.href = url
                link.download = 'image.png'

                //Firefox requires the link to be in the body
                document.body.appendChild(link)
                
                //simulate click
                link.click()

                //remove the link when done
                document.body.removeChild(link)
            },
            clear () {
                this.$parent.playButtonSound()
                var _this = this
                _this.lastUrl = ''
                _this.$refs.signature.clear()
            },
            undo () {
                this.$parent.playButtonSound()
                var _this = this
                _this.$refs.signature.undo()
            },
            addWaterMark () {
                this.$parent.playButtonSound()
                var _this = this
                _this.$refs.signature.addWaterMark({
                    text: 'mark text', // watermark text, > default ''
                    font: '20px Arial', // mark font, > default '20px sans-serif'
                    style: 'all', // fillText and strokeText,    'all'/'stroke'/'fill', > default 'fill
                    fillStyle: 'red', // fillcolor, > default '#333'
                    strokeStyle: 'blue', // strokecolor, > default '#333'
                    x: 100, // fill positionX, > default 20
                    y: 200, // fill positionY, > default 20
                    sx: 100, // stroke positionX, > default 40
                    sy: 200 // stroke positionY, > default 40
                })
            },
            fromDataURL (url) {
                var _this = this
                _this.$refs.signature1.fromDataURL(url)
            }
        }
    }
</script>

<style scoped>
    .signature {
        margin-top: 5px;
        margin-left: auto;
        margin-right: auto;
        border: double 3px transparent;
        border-radius: 5px;
        background-image: linear-gradient(white, white),
        radial-gradient(circle at top left, #4bc5e8, #9f6274);
        background-origin: border-box;
        background-clip: content-box, border-box;
    }
    .img_signature {
        width: 90%;
        height: 400px;
        border: double 3px;
        border-radius: 5px;
        border-image: radial-gradient(circle at top left, #4bc5e8, #9f6274);;
    }
    .button_container{
        margin-top: 5px;
        display: flex;
        margin-left: auto;
        margin-right: auto;
    }
    .col-12 {
        margin-right: auto;
    }
    .btn {
        margin-left: 5px;
    }
</style>

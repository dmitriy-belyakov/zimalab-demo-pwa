<template>
    <div class="container">
        <h4>
            Zimalab PWA demo
        </h4>
        
        <p>
            Demo is based on Vue.js and works online/offline. Feel free to try all the features below.
        </p>

        <div class="link-container">
            <router-link v-for="(link, index) in links" :key="link" :to="link.path">
                <b-button   v-if="link.name != 'Home'"
                            variant="outline-primary"
                            :class="'router-link-button' + ((linksLength == index + 1 && linksLengthEven) ? ' last' : '')"
                            size="lg"
                            @click="clickHandler()">
                    {{ link.name }}
                </b-button>
            </router-link>
        </div>

        <p>
            <br>In this application we've used next modules: vue, vue-loader, vue-router, vuex, axios, vue-signature, vue-qrcode-reader, v-offline,
            vue-spinner, vue-step-progress, vue-country-region-select, vue-bootstrap-datetimepicker, vue-the-mask,
            vue-gallery-slideshow, vue-draggable, vue-touch and vue-cropperjs.
            <br/>Workers page uses firebase to store it's data.
        </p>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data: function () {
            return {
                links: []
            }
        },
        mounted () {
            this.$router.options.routes.forEach(route => {
                this.links.push({
                    name: route.name,
                    path: route.path
                })
            })
        },
        computed: {
            linksLength () {
                return this.links.length
            },
            linksLengthEven () {
                return this.linksLength % 2 == 0
            }
        },
        methods: {
            clickHandler () {
                this.$parent.playButtonSound()
            }
        }
    }
</script>

<style scoped>
    .container {
        max-width: 600px;
        padding-top: 10px;
    }

    .link-container .router-link-button {
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
    
    .link-container button {
        width: 45%;
    }

    .link-container button.last {
        width: calc(90% + 10px);
    }
</style>

<template>
    <div class="container">
        <offline @detected-condition="handleConnectivityChange"></offline>

        <!-- Get location by navigator.geolocation -->
        <div class="card text-center">
            <div class="card-header">
                navigator.getlocation.getCurrentPosition()
            </div>

            <div class="card-body">
                <b-button variant="primary" @click="getLocationByNavigatorGeolocation">Show coordinates</b-button>
                
                <p v-if="navigatorLocation.latitude && navigatorLocation.longitude" class="card-text coordinates">
                    Latitude: {{ navigatorLocation.latitude }}<br>
                    Longitude: {{ navigatorLocation.longitude }}
                </p>

                <b-button variant="primary" 
                    @click="navigatorLocation.showOnMap ?
                        hideMapNavigator() :
                        initGoogleMap(navigatorLocation, 'navigatorLocationMap')"
                    v-if="navigatorLocation.latitude && navigatorLocation.longitude"
                    :disabled="!haveInternetConnetion">
                    {{ navigatorLocation.showOnMap ? 'Hide map' : 'Show on map' }}
                </b-button>

                <div v-show="navigatorLocation.showOnMap" id="navigatorLocationMap" style="width: 100%; height: 400px; margin-top: 5px;"></div>
            </div>

            <div class="card-footer text-muted">
                HTML5 geolocation by browser
            </div>
        </div>

        <!-- Get location by yandex -->
        <div class="card text-center">
            <div class="card-header">
                ymaps.geolocation()
            </div>

            <div class="card-body">
                <b-button variant="primary" @click="getLocationByYandex" :disabled="!haveInternetConnetion">Show coordinates</b-button>

                <p v-if="yandexLocation.latitude && yandexLocation.longitude" class="card-text coordinates">
                    Latitude: {{ yandexLocation.latitude }}<br>
                    Longitude: {{ yandexLocation.longitude }}
                </p>

                <b-button variant="primary" 
                    @click="yandexLocation.showOnMap ?
                        hideMapYandex() :
                        initGoogleMap(yandexLocation, 'yandexLocationMap')"
                    v-if="yandexLocation.latitude && yandexLocation.longitude"
                    :disabled="!haveInternetConnetion">
                    {{ yandexLocation.showOnMap ? 'Hide map' : 'Show on map' }}
                </b-button>

                <div v-show="yandexLocation.showOnMap" id="yandexLocationMap" style="width: 100%; height: 400px; margin-top: 5px;"></div>
            </div>

            <div class="card-footer text-muted">
                Geolocation by Yandex.Maps JavaScript API
            </div>
        </div>

        <!-- Get location by google -->
        <div class="card text-center">
            <div class="card-header">
                Google api
            </div>

            <div class="card-body">
                <b-button variant="primary" @click="getLocationByGoogle()" :disabled="!haveInternetConnetion">Show coordinates</b-button>

                <p v-if="googleLocation.latitude && googleLocation.longitude" class="card-text coordinates">
                    Latitude: {{ googleLocation.latitude }}<br>
                    Longitude: {{ googleLocation.longitude }}
                </p>

                <b-button variant="primary" 
                    @click="googleLocation.showOnMap ?
                        hideMapGoogle() :
                        initGoogleMap(googleLocation, 'googleLocationMap')"
                    v-if="googleLocation.latitude && googleLocation.longitude"
                    :disabled="!haveInternetConnetion">
                    {{ googleLocation.showOnMap ? 'Hide map' : 'Show on map' }}
                </b-button>

                <div v-show="googleLocation.showOnMap" id="googleLocationMap" style="width: 100%; height: 400px; margin-top: 5px;"></div>
            </div>

            <div class="card-footer text-muted">
                Async query to Google Geolocation API by client
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import offline from 'v-offline'
    export default {
        data: function () {
            return {
                navigatorLocation: {
                    latitude: null,
                    longitude: null,
                    showOnMap: false
                },
                yandexLocation: {
                    latitude: null,
                    longitude: null,
                    showOnMap: false
                },
                googleLocation: {
                    latitude: null,
                    longitude: null,
                    showOnMap: false
                },
                googleMapZoom: 16,
                haveInternetConnetion: true
            }
        },
        components: {
            offline
        },
        mounted () {
            if (!navigator.onLine) this.haveInternetConnetion = false
        },
        methods: {
            getLocationByNavigatorGeolocation () {
                this.$parent.playButtonSound()
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.navigatorLocation.latitude = position.coords.latitude
                        this.navigatorLocation.longitude = position.coords.longitude
                    })
                } else {
                    console.error('navigator.geolocation is null')
                }
            },
            getLocationByYandex () {
                this.$parent.playButtonSound()
                var self = this // because 'this' goes undefined in the request below
                ymaps.geolocation.get({
                    provider: 'yandex',
                    autoReverseGeocode: true
                })
                    .then(response => {
                        self.yandexLocation.latitude = response.geoObjects.position[0]
                        self.yandexLocation.longitude = response.geoObjects.position[1]
                    })
                    .catch(error => {
                        console.error(error)
                    })     
            },
            getLocationByGoogle () {
                this.$parent.playButtonSound()
                const axios = require('axios')
                axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCl9yDG-rMvWULzgj1Psc7S624ORElAUDU')
                    .then(response => {
                        this.googleLocation.latitude = response.data.location.lat
                        this.googleLocation.longitude = response.data.location.lng
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            initGoogleMap (locationElement, domElementId) {
                this.$parent.playButtonSound()
                locationElement.showOnMap = true
                var map = new google.maps.Map(document.getElementById(domElementId), {
                    center: {lat: locationElement.latitude, lng: locationElement.longitude},
                    zoom: this.googleMapZoom
                })
                var marker = new google.maps.Marker({
                    position: {lat: locationElement.latitude, lng: locationElement.longitude},
                    map: map,
                    title: 'You are here'
                })
            },
            handleConnectivityChange (status) {
                this.haveInternetConnetion = status
            },
            hideMapNavigator () {
                this.$parent.playButtonSound()
                this.navigatorLocation.showOnMap = false
            },
            hideMapYandex () {
                this.$parent.playButtonSound()
                this.yandexLocation.showOnMap = false
            },
            hideMapGoogle () {
                this.$parent.playButtonSound()
                this.googleLocation.showOnMap = false
            }
        }
    }
</script>

<style scoped>
    .card {
        margin-top: 10px;
    }

    .coordinates {
        margin-top: 10px;
    }
</style>

<template>
    <div class="container">
        <offline @detected-condition="handleConnectivityChange"></offline>

        <!-- <div v-show="!haveInternetConnetion" class="alert alert-warning" role="alert" style="margin-top: 10px;">
            You are in offline mode
        </div> -->

        <!-- Get location by navigator.geolocation -->
        <div class="card text-center">
            <div class="card-header">
                navigator.getlocation.getCurrentPosition()
            </div>

            <div class="card-body">
                <button @click="getLocationByNavigatorGeolocation" class="btn btn-primary">Show coordinates</button>
                
                <p v-if="navigatorLocation.latitude && navigatorLocation.longitude" class="card-text coordinates">
                    Latitude: {{ navigatorLocation.latitude }}<br>
                    Longitude: {{ navigatorLocation.longitude }}
                </p>

                <button
                    @click="navigatorLocation.showOnMap ?
                        navigatorLocation.showOnMap = false :
                        initGoogleMap(navigatorLocation, 'navigatorLocationMap')"
                    v-if="navigatorLocation.latitude && navigatorLocation.longitude"
                    :disabled="!haveInternetConnetion"
                    class="btn btn-primary">
                    {{ navigatorLocation.showOnMap ? 'Hide map' : 'Show on map' }}
                </button>

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
                <button @click="getLocationByYandex" :disabled="!haveInternetConnetion" class="btn btn-primary">Show coordinates</button>

                <p v-if="yandexLocation.latitude && yandexLocation.longitude" class="card-text coordinates">
                    Latitude: {{ yandexLocation.latitude }}<br>
                    Longitude: {{ yandexLocation.longitude }}
                </p>

                <button
                    @click="yandexLocation.showOnMap ?
                        yandexLocation.showOnMap = false :
                        initGoogleMap(yandexLocation, 'yandexLocationMap')"
                    v-if="yandexLocation.latitude && yandexLocation.longitude"
                    :disabled="!haveInternetConnetion"
                    class="btn btn-primary">
                    {{ yandexLocation.showOnMap ? 'Hide map' : 'Show on map' }}
                </button>

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
                <button @click="getLocationByGoogle()" :disabled="!haveInternetConnetion" class="btn btn-primary">Show coordinates</button>

                <p v-if="googleLocation.latitude && googleLocation.longitude" class="card-text coordinates">
                    Latitude: {{ googleLocation.latitude }}<br>
                    Longitude: {{ googleLocation.longitude }}
                </p>

                <button
                    @click="googleLocation.showOnMap ?
                        googleLocation.showOnMap = false :
                        initGoogleMap(googleLocation, 'googleLocationMap')"
                    v-if="googleLocation.latitude && googleLocation.longitude"
                    :disabled="!haveInternetConnetion"
                    class="btn btn-primary">
                    {{ googleLocation.showOnMap ? 'Hide map' : 'Show on map' }}
                </button>

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
            }
        }
    }
</script>

<style>
    .card {
        margin-top: 10px;
    }
    .coordinates {
        margin-top: 10px;
    }
</style>

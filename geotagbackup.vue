<template>
  <div class="container">
    <offline @detected-condition="handleConnectivityChange">
    </offline>
    <div v-show="!onlineStatus" class="alert alert-warning" role="alert" style="margin-top: 10px;">
      You are in offline mode
    </div>
    <div class="card text-center">
      <div class="card-header">
        navigator.getlocation.getCurrentPosition()
      </div>
      <div class="card-body">
        <button @click="getlocationByHTLM" class="btn btn-primary">Show coordinates</button>
        <p v-show="getLocation.htmlLocation !== ''" class="card-text">{{getLocation.htmlLocation}}</p>
        <button @click="initMapForHTMLLocation" v-show="getLocation.htmlLocation !== '' && !showMapForHTMLLocation" :disabled="!onlineStatus" class="btn btn-primary">Show on google maps</button>
        <button @click="showMapForHTMLLocation = false" v-show="showMapForHTMLLocation" class="btn btn-primary">Hide map</button>
        <div v-show="showMapForHTMLLocation" id="mapForHTMLLocation" style="width: 100%; height: 400px; margin-top: 5px;"></div>
      </div>
      <div class="card-footer text-muted">
        HTML5 geolocation by browser
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        ymaps.geolocation()
      </div>
      <div class="card-body">
        <button @click="getLocationByYandex" :disabled="!onlineStatus" class="btn btn-primary">Show coordinates</button>
        <p v-show="getLocation.yandexLocation !== ''" class="card-text">{{getLocation.yandexLocation}}</p>
        <button @click="initMapForYandexLocation" v-show="getLocation.yandexLocation !== '' && !showMapForYandexLocation" :disabled="!onlineStatus" class="btn btn-primary">Show on google maps</button>
        <button @click="showMapForYandexLocation = false" v-show="showMapForYandexLocation" class="btn btn-primary">Hide map</button>
        <div v-show="showMapForYandexLocation" id="mapForYandexLocation" style="width: 100%; height: 400px; margin-top: 5px;"></div>
      </div>
      <div class="card-footer text-muted">
        Geolocation by Yandex.Maps JavaScript API
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        Async query
      </div>
      <div class="card-body">
        <button @click="getLocationAsync" :disabled="!onlineStatus" class="btn btn-primary">Show coordinates</button>
        <p v-show="getLocation.asyncLocation !== ''" class="card-text">{{getLocation.asyncLocation}}</p>
        <button @click="initMapForAsyncLocation" v-show="getLocation.asyncLocation !== '' && !showMapForAsyncLocation" :disabled="!onlineStatus" class="btn btn-primary">Show on google maps</button>
        <button @click="showMapForAsyncLocation = false" v-show="showMapForAsyncLocation" class="btn btn-primary">Hide map</button>
        <div v-show="showMapForAsyncLocation" id="mapForAsyncLocation" style="width: 100%; height: 400px; margin-top: 5px;"></div>
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
        getLocation: {
          htmlLocation: '',
          htmlLocationLat: null,
          htmlLocationLng: null,
          yandexLocation: '',
          yandexLocationLat: null,
          yandexLocationLng: null,
          asyncLocation: '',
          asyncLocationLat: null,
          asyncLocationLng: null
        },
        showMapForHTMLLocation: false,
        showMapForYandexLocation: false,
        showMapForAsyncLocation: false,
        googleMapZoom: 16,
        onlineStatus: true
      }
    },
    components: {
      offline
    },
    mounted () {
      this.checkForConnection()
      if (!navigator.onLine) this.onlineStatus = false
    },
    methods: {
      getlocationByHTLM () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition)
        } else {
          this.getLocation.htmlLocation = 'Geolocation is not supported by this browser.'
        }
      },
      showPosition (position) {
        this.getLocation.htmlLocation = 'Latitude: ' + position.coords.latitude.toString()
        this.getLocation.htmlLocation += ' Longitude: ' + position.coords.longitude.toString()

        this.getLocation.htmlLocationLat = position.coords.latitude.toString()
        this.getLocation.htmlLocationLng = position.coords.longitude.toString()

        // var lat = position.coords.latitude
        // var lng = position.coords.longitude

        // const axios = require('axios')
        // axios.get('https://maps.google.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true&key=AIzaSyCl9yDG-rMvWULzgj1Psc7S624ORElAUDU')
        //   .then(response => {
        //     this.getLocation.htmlLocation = response.data.results[0].formatted_address
        //   })
        //   .catch(error => console.log(error))
      },
      /* eslint-disable */ // because eslint doesn't believe that ymaps exists
      getLocationByYandex () {
        if (!navigator.onLine) {
          alert('No internet connection')
          return
        }
        var self = this // because 'this' goes undefined in the request below
        ymaps.geolocation.get({
          provider: 'yandex',
          autoReverseGeocode: true
        })
          .then(response => {
            var lat = response.geoObjects.position[0]
            var lng = response.geoObjects.position[1]

            self.getLocation.yandexLocation = 'Latitude: ' + response.geoObjects.position[0] + ' Longitude: ' + response.geoObjects.position[1]

            self.getLocation.yandexLocationLat = lat
            self.getLocation.yandexLocationLng = lng

            // const axios = require('axios')
            // axios.get('https://maps.google.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true&key=AIzaSyCl9yDG-rMvWULzgj1Psc7S624ORElAUDU')
            //   .then(response => {
            //     self.getLocation.yandexLocation = response.data.results[0].formatted_address
            //   })
            //   .catch(error => console.log(error))
          })
          .catch(error => {
            console.log(error)
            alert(error)
          })        
      },
      getLocationAsync () {
        if (!navigator.onLine) {
          alert('No internet connection')
          return
        }
        const axios = require('axios')
        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCl9yDG-rMvWULzgj1Psc7S624ORElAUDU')
          .then(response => {
            var lat = response.data.location.lat
            var lng = response.data.location.lng

            this.asyncLocationHandler('Latitude: ' + response.data.location.lat + ' Longitude: ' + response.data.location.lng, lat, lng)

            // const axios = require('axios')
            // axios.get('https://maps.google.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true&key=AIzaSyCl9yDG-rMvWULzgj1Psc7S624ORElAUDU')
            //   .then(response => {
            //     this.asyncLocationHandler(response.data.results[0].formatted_address)
            //   })
            //   .catch(error => console.log(error))
          })
          .catch(error => {
            console.log(error)
            console.log(typeof error)
          })
      },
      asyncLocationHandler (locationString, lat, lng) {
        this.getLocation.asyncLocation = locationString
        this.getLocation.asyncLocationLat = lat
        this.getLocation.asyncLocationLng = lng
      },
      initMapForHTMLLocation () {
        if (!navigator.onLine) {
          alert('No internet connection')
          return
        }
        var latLng = {lat: parseFloat(this.getLocation.htmlLocationLat), lng: parseFloat(this.getLocation.htmlLocationLng)}
        this.showMapForHTMLLocation = true
        var map = new google.maps.Map(document.getElementById('mapForHTMLLocation'), {
          center: latLng,
          zoom: this.googleMapZoom
        })
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: 'You are here'
        });
      },
      initMapForYandexLocation () {
        if (!navigator.onLine) {
          alert('No internet connection')
          return
        }
        var latLng = {lat: parseFloat(this.getLocation.yandexLocationLat), lng: parseFloat(this.getLocation.yandexLocationLng)}
        this.showMapForYandexLocation = true
        var map = new google.maps.Map(document.getElementById('mapForYandexLocation'), {
          center: latLng,
          zoom: this.googleMapZoom
        })
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: 'You are here'
        });
      },
      initMapForAsyncLocation () {
        if (!navigator.onLine) {
          alert('No internet connection')
          return
        }
        var latLng = {lat: this.getLocation.asyncLocationLat, lng: this.getLocation.asyncLocationLng}
        this.showMapForAsyncLocation = true
        var map = new google.maps.Map(document.getElementById('mapForAsyncLocation'), {
          center: latLng,
          zoom: this.googleMapZoom
        })
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: 'You are here'
        });
      },
      checkForConnection () {
        console.log(navigator.onLine)
        return (navigator.onLine) ? true : false
      },
      handleConnectivityChange (status) {
        this.onlineStatus = status
      }
    }
  }
</script>

<style>
  .card {
    margin-top: 3%;
  }
</style>
<template>
  <div class="container">
    <div class="card text-center">
      <div class="card-header">
        navigator.getlocation.getCurrentPosition()
      </div>
      <div class="card-body">
        <button v-on:click="getlocationByHTLM" class="btn btn-primary">Find me</button>
        <p v-show="getLocation.htmlLocation !== ''" class="card-text">{{getLocation.htmlLocation}}</p>
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
        <button class="btn btn-primary">Find me</button>
      </div>
      <div class="card-footer text-muted">
        Geolocation by Yandex.Maps JavaScript API
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        AJAX query
      </div>
      <div class="card-body">
        <button class="btn btn-primary">Find me</button>
      </div>
      <div class="card-footer text-muted">
        AJAX query to Google Geolocation API by client
      </div>
    </div>

    <div class="card text-center">
      <div class="card-header">
        cURL()
      </div>
      <div class="card-body">
        <button class="btn btn-primary">Find me</button>
      </div>
      <div class="card-footer text-muted">
        AJAX query to Google Geolocation API by client
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        getLocation: {
          htmlLocation: ''
        }
      }
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
      }
    }
  }
</script>
<style>
.card {
  margin-top: 3%;
}
</style>

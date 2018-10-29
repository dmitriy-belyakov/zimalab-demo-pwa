<template>
  <div class="container">
    <div class="card text-center">
      <div class="card-header">
        navigator.getlocation.getCurrentPosition()
      </div>
      <div class="card-body">
        <a href="#" class="btn btn-primary">Find me</a>
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
        <a href="#" class="btn btn-primary">Find me</a>
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
        <a href="#" class="btn btn-primary">Find me</a>
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
        <a href="#" class="btn btn-primary">Find me</a>
      </div>
      <div class="card-footer text-muted">
        AJAX query to Google Geolocation API by client
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        myToggle: false,
        buttons: [
          { variant: 'primary', caption: 'Toggle 1', state: true },
          { variant: 'danger', caption: 'Toggle 2', state: false },
          { variant: 'warning', caption: 'Toggle 3', state: true },
          { variant: 'success', caption: 'No Toggle', state: null },
          { variant: 'outline-success', caption: 'Toggle 5', state: false },
          { variant: 'outline-primary', caption: 'Toggle 6', state: false }
        ]
      }
    },
    computed: {
      btnStates () {
        return this.buttons.map(btn => btn.state)
      }
    }
  }
</script>
<style>
.card {
  margin-top: 3%;
}
</style>

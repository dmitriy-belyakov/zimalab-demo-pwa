<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">{{$route.name}}</span>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Vue demo</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">QR Code</router-link>
        <router-link class="mdl-navigation__link" to="/signature" @click.native="hideMenu">Signature</router-link>
        <router-link class="mdl-navigation__link" to="/geotag" @click.native="hideMenu">Geotag</router-link>
        <router-link class="mdl-navigation__link" to="/camera" @click.native="hideMenu">Camera</router-link>
        <router-link class="mdl-navigation__link" to="/workers" @click.native="hideMenu">Workers</router-link>
        <router-link class="mdl-navigation__link" to="/offlineexample" @click.native="hideMenu">Offline mode</router-link>
        <router-link class="mdl-navigation__link" to="/textpage" @click.native="hideMenu">Text Page</router-link>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */

  import { QrcodeReader } from 'vue-qrcode-reader'
  require('material-design-lite')
  export default {
    name: 'app',
    methods: {
      hideMenu: function () {
        document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
        document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
  }
</style>

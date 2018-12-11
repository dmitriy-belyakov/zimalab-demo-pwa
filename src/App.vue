<template>
  <div :class="theme" @click="headerClickHandler(event)">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">{{$route.name}}</span>
        <div class="button-container" style="margin-left: auto">
          <button class="btn btn-primary" @click="toggleSounds">{{ sounds ? 'Sound off' : 'Sound on'}}</button>
          <button class="btn btn-primary" @click="toggleTheme">{{ darkTheme ? 'Light' : 'Dark'}}</button>
        </div>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Vue demo</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Home</router-link>
        <router-link class="mdl-navigation__link" to="/qr" @click.native="hideMenu">QR Code</router-link>
        <router-link class="mdl-navigation__link" to="/signature" @click.native="hideMenu">Signature</router-link>
        <router-link class="mdl-navigation__link" to="/geotag" @click.native="hideMenu">Geotag</router-link>
        <router-link class="mdl-navigation__link" to="/imageupload" @click.native="hideMenu">Image upload</router-link>
        <router-link class="mdl-navigation__link" to="/workers" @click.native="hideMenu">Workers</router-link>
        <router-link class="mdl-navigation__link" to="/offlineexample" @click.native="hideMenu">Offline mode</router-link>
        <router-link class="mdl-navigation__link" to="/textpage" @click.native="hideMenu">Text Page</router-link>
        <router-link class="mdl-navigation__link" to="/purchaseaduck" @click.native="hideMenu">Purchase a duck</router-link>
        <router-link class="mdl-navigation__link" to="/imagecrop" @click.native="hideMenu">Image crop</router-link>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <offline @detected-condition="handleConnectivityChange"></offline>

        <div v-show="!haveInternetConnetion" class="alert alert-warning offline" role="alert" style="margin-top: 10px;">
            You are in offline mode
        </div>

        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import offline from 'v-offline'
  import { QrcodeReader } from 'vue-qrcode-reader'
  import Vue from 'vue'

  require('material-design-lite')

  export default {
    name: 'app',
    components: {
      offline
    },
    data: function () {
      return {
        haveInternetConnetion: true,
        sounds: false,
        darkTheme: false,
        buttonSoundSrc: '/static/sounds/bubble.mp3',
        audio: null
      }
    },
    computed: {
      theme () {
        if (this.darkTheme) {
          return 'dark-theme mdl-layout mdl-js-layout mdl-layout--fixed-header'
        } else {
          return 'mdl-layout mdl-js-layout mdl-layout--fixed-header'
        }
      }
    },
    mounted () {
      Vue.config.silent = true 
      this.audio = new Audio(this.buttonSoundSrc)
      this.audio.load()
    },
    methods: {
      hideMenu: function () {
        this.playButtonSound()
        document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
        document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
      },
      handleConnectivityChange (status) {
        this.haveInternetConnetion = status
      },
      toggleSounds () {
        this.sounds = !this.sounds
        this.playButtonSound()
      },
      toggleTheme () {
        this.playButtonSound()
        this.darkTheme = !this.darkTheme
      },
      playButtonSound () {
        if (this.sounds) {
          //var audio = new Audio(this.buttonSoundSrc);
          this.audio.play();
        }
      },
      headerClickHandler () {
        if (event.offsetX <= 60 && event.offsetY < 48) {
          this.playButtonSound()
        }
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
  @import url('assets/dark-theme.css');

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

  .offline {
    width: 92%;
    margin-left: auto;
    margin-right: auto;
  }

  .mdl-layout__header-row {
    padding-left: 50px;
  }
  .mdl-layout__header {
    background-color: rgb(33,150,243);
  }
  @media screen and (max-width: 992px) {
    .mdl-layout__header-row {
      padding-left: 30px;
    }
  }
</style>

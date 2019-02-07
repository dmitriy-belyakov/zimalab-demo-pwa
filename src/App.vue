<template>
  <div :class="theme" @click="headerClickHandler(event)">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">{{$route.name}}</span>
        <div class="button-container" style="margin-left: auto">
          <button class="btn btn-primary btn-sm icon-btn" @click="pageRefresh" :disabled="!haveInternetConnetion"><i class="material-icons">sync</i></button>
          <button class="btn btn-primary btn-sm icon-btn" @click="toggleSounds"><i class="material-icons">{{ soundsOn ? 'volume_up' : 'volume_off'}}</i></button>
          <button class="btn btn-primary btn-sm icon-btn" @click="toggleTheme"><i class="material-icons">{{ darkMode ? 'brightness_5' : 'brightness_3'}}</i></button>
        </div>
      </div>
    </header>
    
    <div class="mdl-layout__drawer toggled">
      <span class="mdl-layout-title">Vue demo</span>
      <nav class="mdl-navigation nav">
        
        <!-- Menu links -->
        <menu-links autoHideDrawer="true" class="menu-links"/>
      </nav>

      <!-- Profile in the drawer $store.getters.isAuthenticated-->
      <div v-if="$store.getters.isAuthenticated" class="profile">
        <p class="logged-as">
          You logged with <wbr><strong>{{ $store.state.user.user.email }}</strong>
        </p>
        <span href="#" class="logout">
          <b-button variant="outline-primary" size="sm" class="logout-button" @click="logoutHandler">
            Logout
          </b-button>
        </span>
      </div>
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
  import menuLinks from '@/components/menuLinks.vue'

  require('material-design-lite')

  export default {
    name: 'app',
    components: {
      offline,
      menuLinks
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
        if (this.$store.state.darkMode) {
          return 'dark-theme mdl-layout mdl-js-layout mdl-layout--fixed-header'
        } else {
          return 'mdl-layout mdl-js-layout mdl-layout--fixed-header'
        }
      },
      soundsOn () {
        return this.$store.state.soundsOn
      },
      darkMode () {
        return this.$store.state.darkMode
      },
      showMenuIcon () {
        return this.$route.path !== '/login'
      }
    },
    watch: {
      showMenuIcon: function(val) {
        if (document.getElementsByClassName('mdl-layout__drawer-button')[0]) {
          document.getElementsByClassName('mdl-layout__drawer-button')[0].style.display = val ? 'block' : 'none'
        }
      }
    },
    mounted () {
      Vue.config.silent = true 
      this.audio = new Audio(this.buttonSoundSrc)
      this.audio.load()
      // console.log()
      // setTimeout(() => {
      //   if (!this.showMenuIcon) {
      //     console.log('hello ' + this.$route.path)
      //     setTimeout(() => {
      //       document.getElementsByClassName('mdl-layout__drawer-button')[0].style.display = 'none'
      //     }, 200);
      //   }

      //   console.log(this.$route.path)
      // }, 300);
      // if (this.$route.path === '/login')
      //   document.getElementsByClassName('mdl-layout__drawer-button')[0].style.display = 'none'
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
        this.$store.commit('toggleSounds')
        this.playButtonSound()
      },
      toggleTheme () {
        this.playButtonSound()
        this.$store.commit('toggleDarkMode')
      },
      playButtonSound () {
        if (this.soundsOn) {
          this.audio.play();
        }
      },
      headerClickHandler () {
        if (event.offsetX <= 60 && event.offsetY < 48) {
          this.playButtonSound()
        }
      },
      pageRefresh () {
        location.reload()
      },
      logoutHandler () {
        this.hideMenu()
        this.playButtonSound()
        this.$store.dispatch('userSignOut')
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
  @import url('assets/dark-theme.css');
  
  .menu-links {
    min-height: calc(100vh - 192px);
  }

  .profile {
    padding: 10px;
    position: sticky;
    bottom: 0;
    left: 0;
    background-color: inherit !important;
  }

  .logout-button {
    width: 100%;
  }

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

  .icon-btn {
    padding-top: 6%;
  }

  header {
    padding-right: 0px;
  }
</style>

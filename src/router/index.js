import Vue from 'vue'
import Router from 'vue-router'
/* import HomeView from '@/components/HomeView' */
import QrCode from '@/components/QrCodeReader'
/* import DetailView from '@/components/DetailView'
import PostView from '@/components/PostView' */

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'qr-code',
      component: QrCode
    }
  ]
})

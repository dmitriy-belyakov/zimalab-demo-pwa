import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import Signature from '@/components/Signature'
import Geotag from '@/components/Geotag'
import Camera from '@/components/Camera'
import OfflineExample from '@/components/OfflineExample'
import Workers from '@/components/Workers'
import TextPage from '@/components/TextPage'
import Forms from '@/components/Forms'
import Cropper from '@/components/Cropper'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/qr',
      name: 'QR Code',
      component: HomeView
    },
    {
      path: '/signature',
      name: 'Signature',
      component: Signature
    },
    {
      path: '/geotag',
      name: 'Geotag',
      component: Geotag
    },
    {
      path: '/imageupload',
      name: 'Image upload',
      component: Camera
    },
    {
      path: '/offlineexample',
      name: 'Offline mode',
      component: OfflineExample
    },
    {
      path: '/workers',
      name: 'Workers',
      component: Workers
    },
    {
      path: '/textpage',
      name: 'Text page',
      component: TextPage
    },
    {
      path: '/purchaseaduck',
      name: 'Purchase a duck',
      component: Forms
    },
    {
      path: '/imagecrop',
      name: 'Image crop',
      component: Cropper
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView'
import Signature from '@/views/Signature'
import Geotag from '@/views/Geotag'
import Camera from '@/views/Camera'
import OfflineExample from '@/views/OfflineExample'
import Workers from '@/views/Workers'
import Forms from '@/views/Forms'
import Cropper from '@/views/Cropper'
import Home from '@/views/Home'
import PurchaseHistory from '@/views/PurchaseHistory'

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
      path: '/purchaseaduck',
      name: 'Purchase a duck',
      component: Forms
    },
    {
      path: '/imagecrop',
      name: 'Image crop',
      component: Cropper
    },
    {
      path: '/purchasehistory',
      name: 'Purchase history',
      component: PurchaseHistory
    }
  ]
})

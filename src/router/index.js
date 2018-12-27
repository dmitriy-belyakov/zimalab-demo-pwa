import Vue from 'vue'
import Router from 'vue-router'
import QRCodeScanner from '@/views/QRCodeScanner'
import Signature from '@/views/Signature'
import Geotag from '@/views/Geotag'
import Camera from '@/views/Camera'
import OfflineExample from '@/views/OfflineExample'
import Workers from '@/views/Workers'
import Purchase from '@/views/Purchase'
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
      component: QRCodeScanner
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
      path: '/imagecrop',
      name: 'Image crop',
      component: Cropper
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
      component: Purchase
    },
    {
      path: '/purchasehistory',
      name: 'Purchase history',
      component: PurchaseHistory
    }
  ]
})

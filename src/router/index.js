import Vue from 'vue'
import Router from 'vue-router'
// import QRCodeScanner from '@/views/QRCodeScanner'
// import Signature from '@/views/Signature'
// import Geotag from '@/views/Geotag'
// import ImageUpload from '@/views/ImageUpload'
// import OfflineExample from '@/views/OfflineExample'
// import Workers from '@/views/Workers'
// import Purchase from '@/views/Purchase'
// import Cropper from '@/views/Cropper'
// import Home from '@/views/Home'
// import PurchaseHistory from '@/views/PurchaseHistory'
import store from '@/store/index.js'
Vue.use(Router)

const router = new Router({
  // notice that history mode isn't supported when building for apache cordova (use hash mode instead)
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/qr',
      name: 'QR Code',
      component: () => import('@/views/QRCodeScanner.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/signature',
      name: 'Signature',
      component: () => import('@/views/Signature.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/geotag',
      name: 'Geotag',
      component: () => import('@/views/Geotag.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/imageupload',
      name: 'Image upload',
      component: () => import('@/views/ImageUpload.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/imagecrop',
      name: 'Image crop',
      component: () => import('@/views/Cropper.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/offlineexample',
      name: 'Offline mode',
      component: () => import('@/views/OfflineExample.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/workers',
      name: 'Workers',
      component: () => import('@/views/Workers.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/purchaseaduck',
      name: 'Purchase a duck',
      component: () => import('@/views/Purchase.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/purchasehistory',
      name: 'Purchase history',
      component: () => import('@/views/PurchaseHistory.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: {
        authRequired: false
      }
    },
    {
      path: '/signup',
      name: 'Sign up',
      component: () => import('@/views/Signup.vue'),
      meta: {
        authRequired: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({
        path: '/login'
      })
    } else {
      next()

      var intId = setInterval(() => {
        if (document.getElementsByClassName('mdl-layout__drawer-button')[0]) {
          document.getElementsByClassName('mdl-layout__drawer-button')[0].style.display = 'block'
          clearInterval(intId)
        }
      }, 10)
    }
  } else {
    next()
  }
})

export default router

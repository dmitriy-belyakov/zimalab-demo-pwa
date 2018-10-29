import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import Signature from '@/components/Signature'
import Geotag from '@/components/Geotag'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signature',
      name: 'signature',
      component: Signature
    },
    {
      path: '/geotag',
      name: 'geotag',
      component: Geotag
    }
  ]
})

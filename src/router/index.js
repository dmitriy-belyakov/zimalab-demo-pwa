import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import Signature from '@/components/Signature'

Vue.use(Router)

export default new Router({
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
    }
  ]
})

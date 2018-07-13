import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Goods from '../components/Goods/Goods.vue'
import Ratings from '../components/Ratings/Ratings.vue'
import Sellers from '../components/Sellers/Sellers.vue'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/sellers',
      component: Sellers
    },
    {
      path: '*',
      redirect: '/goods'
    }
  ],
  linkActiveClass: 'active'
})

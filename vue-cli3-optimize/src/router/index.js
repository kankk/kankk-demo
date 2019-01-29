import Vue from 'vue'
import Router from 'vue-router'

import homeRoutes from './home'
import aboutRoutes from './about'

Vue.use(Router)

const routes = [...homeRoutes, ...aboutRoutes]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

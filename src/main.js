import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false


// 定义路由
const routes = [{
  path: '/',
  component: () => import('../src/components/Index')
}, {
  path: '/login',
  component: () => import('../src/components/Login')
}]
// 创建路由实例
const router = new VueRouter({
  routes
})
// 定义store
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {

  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
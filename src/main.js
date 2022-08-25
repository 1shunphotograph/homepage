import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

// 定义路由
const routes = [{
  path: '/',
  component: () => import('../src/components/Index')
}]
// 创建路由实例
const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
import Vue from 'vue'
import App from '../src/App.vue'
import HeimaUI from '../packages/index.js'
Vue.config.productionTip = false
Vue.use(HeimaUI)//当你调用Vue.use一个对象的时候，会自动找到index.js最下面的install方法去执行
new Vue({
  render: h => h(App),
}).$mount('#app')

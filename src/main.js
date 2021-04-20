import Vue from 'vue'
import App from './App.vue'

// 全局样式
import './styles/reset.less'
// 引入路由模块
import router from './router/index';

// 引入 vant 中的组件
import { Toast } from 'vant';
// 将组件挂载到全局，这样在每个组件中可以通过this 进行使用
Vue.use(Toast);





Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,

  render: h => h(App),
}).$mount('#app')

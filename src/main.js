import Vue from 'vue'
import App from './App.vue'

// 全局样式
import './styles/reset.less'
// 引入路由模块
import router from './router/index';

// 引入 vant 中的组件
import {
  Toast,
  Icon,
  Uploader,
  Dialog,
  Field,
  ActionSheet,
  Tab,
  Tabs,
  List,
  PullRefresh,
} from 'vant';

// 将组件挂载到全局，这样在每个组件中可以通过this 进行使用
Vue.use(Toast)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh);



Vue.config.productionTip = false

// vue 实例渲染
new Vue({
  // 注入路由 -- 让应用使用 router进行路由管理 -- 使用路由功能
  router,

  // render 是组件的内置成员，他是一个函数，函数有一个参数 h 
  // h 才是真正的渲染函数，他可以渲染指定的组件，并且返回渲染的结果
  render: h => h(App),

  // $mount 实现挂载功能，就是可以将渲染好的组件挂载到页面
  // #app 是页面的DOM 元素 -- index.html 里面的元素
}).$mount('#app')

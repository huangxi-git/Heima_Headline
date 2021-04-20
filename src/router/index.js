// 工程化-模块化
import Vue from 'vue';
import VueRouter from 'vue-router';
// 全局挂载
Vue.use(VueRouter);

// 创建路由
const router = new VueRouter({
    // 配置路由
    routes: [
        // 登录路由
        {
            name: 'login',
            path: '/login',
            component: () => import('../views/user/login.vue'),
        },

    ],
});

// // 导航守卫
// router.beforeEach((to, from, next) => {
//     // 判断是去登录页
//     if (to.path == '/login') {
//         next();
//     }
//     // 不是去登录页
//     else {
//         // 有 token
//         if (token) {
//             next();
//         }
//         // 没有 token 
//         else {
//             next({ path: '/index' });
//         };
//     };
// });



// 暴露
export default router;
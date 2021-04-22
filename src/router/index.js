// 工程化-模块化
import Vue from 'vue';
import VueRouter from 'vue-router';
// 全局挂载
Vue.use(VueRouter);

import { Toast } from 'vant'

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
        //注册路由
        {
            name: 'register',
            path: '/register',
            component: () => import('../views/user/register.vue'),
        },
        // 个人中心路由
        {
            name: 'personal',
            path: '/personal/:id',
            component: () => import('../views/user/personal.vue'),
        },
        // 个人中心编辑
        {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () => import('../views/user/edit_profile.vue'),
        },
    ],
});

// 导航守卫    to.path.indexOf('/personal/') !== -1
// to: 目标路由对象，里面有path 就是目标路由地址
router.beforeEach((to, from, next) => {
    // 只判断是否去 /personal 路由 -- 判断带参
    if (to.path.indexOf('/personal/') !== -1) {
        // 拿到token
        let token = localStorage.getItem('heimatoutiao_loginToken');
        if (token) {
            next();
        } else {
            Toast('未登录，请先登录');
            // 重定向到登录
            next({ name: 'login' });
        }
    } else {
        next();
    }
});



// 暴露
export default router;
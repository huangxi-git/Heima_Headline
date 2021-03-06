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
        // 重定向
        {
            path: '/',
            redirect: { name: 'index' },
        },
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
        // 首页
        {
            name: 'index',
            path: '/index',
            component: () => import('../views/index.vue'),
        },
        // 文章详情
        {
            name: 'postDetail',
            path: '/postDetail/:id',
            component: () => import('../views/post/postDetail.vue'),
        },
        // 我的关注
        {
            name: 'myfollow',
            path: '/myfollow',
            component: () => import('../views/user/myfollow.vue'),
        },
        // 我的收藏
        {
            name: 'myStar',
            path: '/myStar',
            component: () => import('../views/user/myStar.vue'),
        },
        // 我的收藏
        {
            name: 'comment',
            path: '/comment/:id',
            component: () => import('../views/comment.vue'),
        },
        // 栏目管理
        {
            name: 'cateManager',
            path: '/cateManager',
            component: () => import('../views/cateManager.vue'),
        },
        // 栏目管理
        {
            name: 'search',
            path: '/search',
            component: () => import('../views/search.vue'),
        },

    ],
});

// 导航守卫    to.path.indexOf('/personal/') !== -1
// to: 目标路由对象，里面有path 就是目标路由地址
router.beforeEach((to, from, next) => {
    let arr = ['personal', 'cateManager', 'edit_profile'];
    if (arr.indexOf(to.name) !== -1) {
        // 拿到token
        let token = localStorage.getItem('heimatoutiao_loginToken');
        if (token) {
            next();
        } else {
            Toast('未登录，请先登录');
            // 重定向到登录
            next({ path: '/login?redirect_url=' + from.path });
            // console.log('from:', from.path);
        }
    } else {
        next();
    }
});



// 暴露
export default router;
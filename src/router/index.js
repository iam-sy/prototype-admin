import Vue from 'vue';
import VueRouter from 'vue-router';

const LoginPage = () =>
    import(/* webpackChunkName: "loginpage" */ '../views/login/LoginPage.vue');
const BlogList = () =>
    import(/* webpackChunkName: "bloglist" */ '../views/blog/BlogList.vue');
const BlogWrite = () =>
    import(/* webpackChunkName: "blogwrite" */ '../views/blog/BlogWrite.vue');
const BlogModify = () =>
    import(/* webpackChunkName: "blogmodify" */ '../views/blog/BlogModify.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/blog/list/:sec',
        name: 'bloglist',
        component: BlogList,
    },
    {
        path: '/blog/write',
        name: 'blogwrite',
        component: BlogWrite,
    },
    {
        path: '/blog/modify',
        name: 'blogmodify',
        component: BlogModify,
    },
    {
        path: '/login',
        name: 'loginpage',
        component: LoginPage,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;

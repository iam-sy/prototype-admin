import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import eventBus from '@/utils/eventBus';
const LoginPage = () =>
    import(/* webpackChunkName: "loginpage" */ '../views/login/LoginPage.vue');
const BlogList = () =>
    import(/* webpackChunkName: "bloglist" */ '../views/blog/BlogList.vue');
const BlogWrite = () =>
    import(/* webpackChunkName: "blogwrite" */ '../views/blog/BlogWrite.vue');
const BlogModify = () =>
    import(/* webpackChunkName: "blogmodify" */ '../views/blog/BlogModify.vue');
const BlogView = () =>
    import(/* webpackChunkName: "blogview" */ '../views/blog/BlogView.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/blog/list',
        name: 'bloglist',
        component: BlogList,
        beforeEnter,
    },
    {
        path: '/blog/write',
        name: 'blogwrite',
        component: BlogWrite,
    },
    {
        path: '/blog/modify/:id',
        name: 'blogmodify',
        component: BlogModify,
        beforeEnter,
    },
    {
        path: '/blog/view/:id',
        name: 'blogview',
        component: BlogView,
        beforeEnter,
    },
    {
        path: '/login',
        name: 'loginpage',
        component: LoginPage,
    },
];
function beforeEnter(to, from, next) {
    /*    eventBus.$emit('start:spinner');

    if (!store.getters['isLoading']) {
        next();
    }*/
    //eventBus.$emit('start:spinner');

    console.log('beforeEnter');
    next();
}
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;

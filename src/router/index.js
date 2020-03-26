import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import * as blog from '@/store/modules/blog/type';

/* components views */
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
    },
    {
        path: '/blog/view',
        name: 'blogDetail',
        component: BlogView,
        children: [
            {
                path: ':id',
                name: 'blogview',
                component: BlogView,
                props: true,
                beforeEnter: (to, from, next) => {
                    store
                        .dispatch(
                            `${blog.NAMESPACE}/${blog.FETCH_ITEM}`,
                            to.params.id,
                        )
                        .then(next())
                        .catch(() => new Error('FETCH_VIEW error'));
                },
            },
        ],
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

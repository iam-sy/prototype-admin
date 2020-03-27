import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import * as blog from '@/store/modules/blog/type';
import * as auth from '@/store/modules/auth/type';
import { getUserFromCookie } from '@/utils/cookies';
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

function beforeEnter(to, from, next) {
    if (store.getters['isLoggedIn'] || getUserFromCookie()) {
        next();
    } else {
        alert('sign in please');
        next('/login');
    }
}

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'loginpage',
        component: LoginPage,
        beforeEnter: async (to, from, next) => {
            store.getters[`${auth.NAMESPACE}/${auth.ISLOGIN}`]
                ? next('/blog/list')
                : next();
        },
    },
    {
        path: '/blog/list',
        name: 'bloglist',
        component: BlogList,
        beforeEnter: async (to, from, next) => {
            if (
                store.getters[`${auth.NAMESPACE}/${auth.ISLOGIN}`] ||
                getUserFromCookie()
            ) {
                const {
                    config: {
                        perPage,
                        currentPage,
                        pageGroup,
                        limit,
                        sec,
                        searchtext,
                        searchtags,
                    },
                } = store.getters[`${blog.NAMESPACE}/${blog.GET_LIST}`];
                const searchData = {
                    perPage,
                    currentPage,
                    pageGroup,
                    limit,
                    sec,
                };

                if (searchtext) searchData.schtext = searchtext;
                if (searchtags.length > 0)
                    searchData.schtags = searchtags.join(',');

                await store.dispatch(
                    `${blog.NAMESPACE}/${blog.FETCH_ITEMS}`,
                    searchData,
                );
                next();
                /*.then()
                        .catch(() => new Error('FETCH_VIEW error'));*/
            } else {
                alert('sign in please');
                next('/login');
            }
        },
    },
    {
        path: '/blog/write',
        name: 'blogwrite',
        component: BlogWrite,
        beforeEnter,
    },
    {
        path: '/blog/modify/:id',
        name: 'blogmodify',
        component: BlogModify,
        beforeEnter,
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
                beforeEnter: async (to, from, next) => {
                    if (
                        store.getters[`${auth.NAMESPACE}/${auth.ISLOGIN}`] ||
                        getUserFromCookie()
                    ) {
                        const storePostItemId =
                            store.getters[`${blog.NAMESPACE}/${blog.GET_ID}`];
                        if (storePostItemId === to.params.id) {
                            next();
                        } else {
                            await store.dispatch(
                                `${blog.NAMESPACE}/${blog.FETCH_ITEM}`,
                                to.params.id,
                            );
                            next();
                            /*.then()
                                .catch(() => new Error('FETCH_VIEW error'));*/
                        }
                    } else {
                        alert('sign in please');
                        next('/login');
                    }
                },
            },
        ],
    },
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;

import Vue from 'vue';
import Vuex from 'vuex';
import blogStore from '@/store/modules/blog';
import authStore from '@/store/modules/auth';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: { blogStore, authStore },
    state: {
        user: '',
    },
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    mutations: {},
    actions: {},
});

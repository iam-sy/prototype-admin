import Vue from 'vue';
import Vuex from 'vuex';
import blogStore from '@/store/modules/blog';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: { blogStore },
    state: {},
    getters: {},
    mutations: {},
    actions: {},
});

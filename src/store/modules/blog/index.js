import { fetchPosts, fetchPostById } from '@/api';
import * as blog from '@/store/modules/blog/type';
import { parseHeadings } from '@/utils/parser';
import LoginPage from '@/views/login/LoginPage';

const postViewInitState = () => {
    return {
        posts: {
            config: {
                sec: 'all',
                currentPage: 1,
                startPage: 1,
                endPage: null,
                total: 0,
                totalPage: null,
                pageGroup: 1,
                perPage: 10,
                limit: 10,
                schtext: '',
                schtags: '',
                searchtext: '',
                searchtags: [],
            },
            items: [],
        },
        postItem: {
            sec: '',
            title: '',
            tags: [],
            desc: '',
            image: '',
            content: '',
            createdAt: '',
            headingsInfo: [],
            next: '',
            prev: '',
        },
    };
};

export default {
    namespaced: true,
    state: postViewInitState,
    getters: {
        [blog.GET_LIST](state) {
            return state.posts;
        },
        [blog.GET_ID](state) {
            return state.postItem._id;
        },
    },
    mutations: {
        [blog.SET_ITEMS](state, { totalCount, postItems }) {
            state.posts.config.total = totalCount;
            state.posts.items = postItems;
        },
        [blog.SET_CONFIG](state, data) {
            const { config } = state.posts;
            Object.assign(config, data);
        },
        [blog.SET_PAGEING_GROUP](state) {
            const { config } = state.posts;
            state.posts.config.totalPage = Math.ceil(
                config.total / config.limit,
            );
            state.posts.config.pageGroup = Math.ceil(
                config.currentPage / config.perPage,
            );
            state.posts.config.totalGroup = Math.ceil(
                config.totalPage / config.perPage,
            );
        },
        [blog.SET_ITEM](state, { posts, next, prev }) {
            state.postItem = {
                ...posts,
                next,
                prev,
            };
        },
        [blog.SET_RESET_ITEM](state) {
            const initial = postViewInitState();
            Object.keys(initial).forEach(key => {
                state[key] = initial[key];
            });
        },
    },
    actions: {
        async [blog.FETCH_ITEMS]({ commit }, searchData) {
            try {
                const {
                    data: { totalCount, posts: postItems },
                } = await fetchPosts({
                    ...searchData,
                });
                //console.log(postItems);
                commit(blog.SET_ITEMS, { totalCount, postItems });
                commit(blog.SET_PAGEING_GROUP);
            } catch (e) {
                console.log(e);
            }
        },
        async [blog.FETCH_ITEM]({ commit }, postid) {
            try {
                const { data } = await fetchPostById(postid);
                commit(blog.SET_ITEM, data);
            } catch (e) {
                console.log(e);
            }
        },
        [blog.FETCH_CONFIG]({ commit }, data) {
            commit(blog.SET_CONFIG, data);
        },
        [blog.FETCH_RESET]({ commit }) {
            commit(blog.SET_RESET_ITEM);
        },
    },
};

import { fetchPostById } from '@/api';
import * as blog from '@/store/modules/blog/type';
import { parseHeadings } from '@/utils/parser';

const postViewInitState = () => {
    return {
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
        [blog.GET_ID](state) {
            return state.postItem._id;
        },
    },
    mutations: {
        [blog.SET_ITEMS](state, { posts, next, prev }) {
            state.postItems = {
                ...posts,
                next,
                prev,
                headingsInfo: parseHeadings(posts.content),
            };
        },
        [blog.SET_ITEM](state, { posts, next, prev }) {
            state.postItem = {
                ...posts,
                next,
                prev,
                headingsInfo: parseHeadings(posts.content),
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
        async [blog.FETCH_ITEM]({ commit }, postid) {
            try {
                const { data } = await fetchPostById(postid);
                commit(blog.SET_ITEM, data);
            } catch (e) {
                console.log(e);
            }
        },
        [blog.FETCH_RESET]({ commit }) {
            commit(blog.SET_RESET_ITEM);
        },
    },
};

import { fetchPostById } from '@/api';
import * as blog from '@/store/modules/blog/type';
import { parseHeadings } from '@/utils/parser';

const postViewInitState = () => {
    return {
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
    };
};

export default {
    namespaced: true,
    state: postViewInitState,
    getters: {},
    mutations: {
        [blog.SET_ITEM](
            state,
            {
                posts: { sec, title, image, tags, desc, content, createdAt },
                next,
                prev,
            },
        ) {
            state.sec = sec;
            state.title = title;
            state.image = image;
            state.tags = tags;
            state.desc = desc;
            state.content = content;
            state.createdAt = createdAt;
            state.next = next;
            state.prev = prev;
            state.headingsInfo = parseHeadings(content);
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

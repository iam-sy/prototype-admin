import { loginUser, registerUser } from '@/api';
import * as auth from '@/store/modules/auth/type';
import {
    saveAuthToCookie,
    saveUserToCookie,
    deleteCookie,
    getUserFromCookie,
} from '@/utils/cookies';

const authInitState = () => {
    return {
        user: {},
        token: '',
    };
};

export default {
    namespaced: true,
    state: authInitState,
    getters: {
        [auth.ISLOGIN](state) {
            return !!state.token || getUserFromCookie();
        },
        [auth.USERTOKEN](state) {
            return state.token;
        },
    },
    mutations: {
        [auth.SET_USER](state, user) {
            state.user = user;
        },
        [auth.SET_TOKEN](state, token) {
            state.token = token;
        },
        [auth.SET_LOGOUT](state, data) {
            state.user = null;
            state.token = null;
            deleteCookie('til_auth');
            deleteCookie('til_user');
        },
        [auth.SET_REGISTER](state, data) {},
    },
    actions: {
        async [auth.FETCH_LOGIN]({ commit }, data) {
            try {
                const res = await loginUser(data);
                commit(auth.SET_USER, res.data.displayName);
                commit(auth.SET_TOKEN, res.data.accessToken);
                console.log(res);
                saveUserToCookie(res.data.displayName);
                saveAuthToCookie(res.data.accessToken);
            } catch (e) {
                console.log(e);
            }
        },
        [auth.FETCH_LOGOUT]({ commit }, data) {},
    },
};

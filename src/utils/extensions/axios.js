import axios from 'axios';
import eventBus from '@/utils/eventBus';
import constants from '../../../common/config';
import store from '@/store/index.js';
import { getAuthFromCookie } from '@/utils/cookies.js';
import * as auth from '@/store/modules/auth/type';

const defaultInstance = instance => {
    instance.interceptors.request.use(
        conf => {
            eventBus.$emit('start:spinner');
            return conf;
        },
        error => {
            eventBus.$emit('end:spinner');
            return Promise.reject(error);
        },
    );
    instance.interceptors.response.use(
        response => {
            eventBus.$emit('end:spinner');
            return response;
        },
        error => {
            eventBus.$emit('end:spinner');
            return Promise.reject(error);
        },
    );
    return instance;
};

const authInterceptors = instance => {
    instance.interceptors.request.use(
        conf => {
            eventBus.$emit('start:spinner');
            conf.headers.Authorization =
                store.getters[`${auth.NAMESPACE}/${auth.USERTOKEN}`] ||
                getAuthFromCookie();
            return conf;
        },
        error => {
            eventBus.$emit('end:spinner');
            return Promise.reject(error.response);
        },
    );
    instance.interceptors.response.use(
        response => {
            eventBus.$emit('end:spinner');
            return response;
        },
        error => {
            eventBus.$emit('end:spinner');
            return Promise.reject(error);
        },
    );
    return instance;
};

const create = (url, options) => {
    const instance = axios.create(Object.assign({ baseURL: url }, options));
    defaultInstance(instance);
    return instance;
};

function createWithAuth(url, options) {
    const instance = axios.create(Object.assign({ baseURL: url }, options));
    authInterceptors(instance);
    return instance;
}

const axiosApi = create(process.env.VUE_APP_API_ADDRESS);
const axiosApiAuth = createWithAuth(process.env.VUE_APP_API_ADDRESS);
export { axiosApi, axiosApiAuth };

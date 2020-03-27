import axios from 'axios';
import eventBus from '@/utils/eventBus';
import constants from '../../../common/config';
import store from '@/store/index.js';
import { getAuthFromCookie } from '@/utils/cookies.js';

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
                store.getters['userToken'] || getAuthFromCookie();
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

const axiosApi = create(constants.apiAdress);
const axiosApiAuth = createWithAuth(constants.apiAdress);
export { axiosApi, axiosApiAuth };

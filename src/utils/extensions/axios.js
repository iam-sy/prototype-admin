import axios from 'axios';
import constants from '../../../common/config';

const instance = axios.create({
    baseURL: constants.apiAdress,
});

export default instance;

/*
export default {
    install(Vue) {
        Vue.prototype.$http = http;
    },
};
*/

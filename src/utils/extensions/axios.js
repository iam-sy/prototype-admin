import axios from 'axios';
import eventBus from '@/utils/eventBus';
import constants from '../../../common/config';
const instance = axios.create({
    baseURL: constants.apiAdress,
});
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

export default instance;

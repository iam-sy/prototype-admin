import { axiosApi } from '@/utils/extensions/axios';

function loginUser(data) {
    return axiosApi.post('/api/auth/login', data);
}

function registerUser(sec) {
    return axiosApi.post('/api/auth/register', sec);
}

export { loginUser, registerUser };

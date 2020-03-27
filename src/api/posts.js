import { axiosApiAuth } from '@/utils/extensions/axios';

function createPost(data) {
    return axiosApiAuth.post('/api/post', data);
}

function fetchPosts(sec) {
    return axiosApiAuth.get('/api/post', {
        params: {
            ...sec,
        },
    });
}

function fetchPostById(id) {
    return axiosApiAuth.get(`/api/post/${id}`);
}

function editPostById(id, data) {
    return axiosApiAuth.put(`/api/post/${id}`, data);
}

function deletePostById(id) {
    return axiosApiAuth.delete(`/api/post/${id}`);
}

export { createPost, fetchPosts, fetchPostById, editPostById, deletePostById };

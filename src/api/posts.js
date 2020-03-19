import instance from '@/utils/extensions/axios';

function createPost(data) {
    return instance.post('/api/post', data);
}

function fetchPosts(sec) {
    return instance.get('/api/post', {
        params: {
            sec: sec,
        },
    });
}

function fetchPostById(id) {
    return instance.get(id);
}

function editPostById(id, data) {
    return instance.put(id, data);
}

function deletePostById(id) {
    return instance.delete(id);
}

export { createPost, fetchPosts, fetchPostById, editPostById, deletePostById };

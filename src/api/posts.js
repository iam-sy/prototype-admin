import instance from '@/utils/extensions/axios';

function createPost(data) {
    return instance.post('/api/post', data);
}

export { createPost };

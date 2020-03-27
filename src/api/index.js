import {
    fetchPosts,
    createPost,
    fetchPostById,
    editPostById,
    deletePostById,
} from '@/api/posts';
import { loginUser, registerUser } from '@/api/auth';
import { uploadImage } from '@/api/imageUploader';

export {
    fetchPosts,
    uploadImage,
    createPost,
    fetchPostById,
    editPostById,
    deletePostById,
    loginUser,
    registerUser,
};

import {
    createPost,
    fetchPostById,
    editPostById,
    deletePostById,
} from '@/api/posts';
import { loginUser, registerUser } from '@/api/auth';
import { uploadImage } from '@/api/imageUploader';

export {
    uploadImage,
    createPost,
    fetchPostById,
    editPostById,
    deletePostById,
    loginUser,
    registerUser,
};

import {
    createPost,
    fetchPostById,
    editPostById,
    deletePostById,
} from '@/api/posts';
import { uploadImage } from '@/api/imageUploader';

export { uploadImage, createPost, fetchPostById, editPostById, deletePostById };

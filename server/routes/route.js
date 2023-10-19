import express from 'express';

import {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts,
    getPostByUserName,
} from '../controller/post-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import {
    newComment,
    getComments,
    getAllComments,
    deleteComment,
    removeComment,
} from '../controller/comment-controller.js';
import {
    loginUser,
    signupUser,
    logoutUser,
    getAllUser,
    editUser,
    getUser,
    deleteUser,
} from '../controller/user-controller.js';
import {
    authenticateToken,
    createNewToken,
} from '../controller/jwt-controller.js';

import upload from '../utils/upload.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.delete('/logout/:token', logoutUser);
router.get('/admin', authenticateToken, getAllUser);
router.get('/user/:username', authenticateToken, getUser);
router.get('/user/posts/:username', authenticateToken, getPostByUserName);
router.delete('/user/delete/:id', authenticateToken, deleteUser);
router.put('/user/edit/:username', authenticateToken, editUser);

router.post('/token', createNewToken);

router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id', authenticateToken, getPost);
router.get('/posts', authenticateToken, getAllPosts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', authenticateToken, newComment);
router.delete('/comments/delete/:id', authenticateToken, deleteComment);
router.delete('/comments/remove/:id', authenticateToken, removeComment);
router.get('/comments/:id', authenticateToken, getComments);
router.get('/comments', authenticateToken, getAllComments);

export default router;

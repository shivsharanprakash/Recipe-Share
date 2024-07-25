import express from 'express';
import { getUserProfile, login, register } from '../controller/UserController.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();
router.post('/register', register);
router.post('/login',login);
router.get('/getuserprofile',authMiddleware, getUserProfile);

export default router;

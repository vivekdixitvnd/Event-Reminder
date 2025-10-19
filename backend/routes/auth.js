import express from 'express';
import { signup, login, saveSubscription } from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/subscribe', authMiddleware, saveSubscription);

export default router;

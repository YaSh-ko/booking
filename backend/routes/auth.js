import express from 'express'
import { sendCode, verifyCode, logout, me } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMidleware.js';

const router = express.Router();

router.post('/send-code', sendCode);
router.post('/verify-code', verifyCode);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);

export default router;
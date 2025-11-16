import express from 'express'
import { toggleFavorite } from '../controllers/favController.js';
import { authMiddleware } from '../middleware/authMidleware.js';

const router = express.Router();

router.post('/toggle', authMiddleware, toggleFavorite);

export default router;
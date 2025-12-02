import express from 'express'
import { addReview, deleteReview } from '../controllers/reviewsController.js';
import { authMiddleware } from '../middleware/authMidleware.js';

const router = express.Router();

router.post('/addReview', authMiddleware, addReview);
router.post('/deleteReview', authMiddleware, deleteReview);

export default router;
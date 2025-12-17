import express from 'express'
import { addReview, deleteReview, getReview } from '../controllers/reviewsController.js';
import { authMiddleware } from '../middleware/authMidleware.js';

const router = express.Router();

router.post('/addReview', authMiddleware, addReview);
router.post('/deleteReview', authMiddleware, deleteReview);
router.get('/getReview', getReview);

export default router;
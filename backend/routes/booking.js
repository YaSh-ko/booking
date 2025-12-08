import express from 'express'
import { createBooking, deleteBooking } from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/authMidleware.js';

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.post('/deleteBooking', authMiddleware, deleteBooking);

export default router;
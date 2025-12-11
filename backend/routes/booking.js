import express from 'express'
import { createBooking, deleteBooking, myBookings } from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/authMidleware.js';
import { myFavorite } from '../controllers/favController.js';

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.post('/deleteBooking', authMiddleware, deleteBooking);
router.get('/myBookings', authMiddleware, myBookings);

export default router;
import express from 'express'
import { getHotels, getInfobyID } from '../controllers/hotelController.js';

const router = express.Router();

router.get('/', getHotels);
router.get('/details', getInfobyID);

export default router;
import express from 'express'
import { getHotels, getInfobyID, searchHotels } from '../controllers/hotelController.js';

const router = express.Router();

router.get('/', getHotels);
router.get('/details', getInfobyID);
router.get('/search', searchHotels);

export default router;
import express from 'express'
import { toggleFavorite, myFavorite} from '../controllers/favController.js';
import { authMiddleware } from '../middleware/authMidleware.js';

const router = express.Router();

router.post('/toggle', authMiddleware, toggleFavorite);
router.get('/myFavorite', authMiddleware, myFavorite);

export default router;
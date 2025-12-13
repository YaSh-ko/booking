import express from 'express'
import { toggleFavorite, myFavorite, GetFavorite} from '../controllers/favController.js';
import { authMiddleware } from '../middleware/authMidleware.js';

const router = express.Router();

router.post('/toggle', authMiddleware, toggleFavorite);
router.get('/myFavorite', authMiddleware, myFavorite);
router.get('/GetFavorite', authMiddleware, GetFavorite);

export default router;
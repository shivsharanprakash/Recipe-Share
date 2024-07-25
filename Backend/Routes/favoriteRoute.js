import express from 'express';
import { getFavorites, addFavorite, deleteFavorite } from '../controller/favoriteController.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  getFavorites(req, res);
});

router.post('/', (req, res) => {
  addFavorite(req, res);
});

router.delete('/:id', (req, res) => {
  deleteFavorite(req, res);
});

export default router;

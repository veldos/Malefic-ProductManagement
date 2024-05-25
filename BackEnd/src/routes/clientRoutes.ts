import express from 'express';
import {
  getClientDashboard,
  getCart,
  addToCart,
  removeFromCart,
  placeOrder,
} from '../controllers/clientController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/dashboard', authMiddleware, getClientDashboard);
router.get('/cart', authMiddleware, getCart);
router.post('/cart', authMiddleware, addToCart);
router.delete('/cart', authMiddleware, removeFromCart);
router.post('/order', authMiddleware, placeOrder);

export default router;

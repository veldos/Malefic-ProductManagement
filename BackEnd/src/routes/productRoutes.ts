import express from 'express';
import { createProduct, 
        getAllProduct,
        getProductById,
        updateProductById,
        deleteProductById } from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';
const router = express.Router();

router.post('/product/create', createProduct);
router.get('/products',authMiddleware, getAllProduct);
router.get('/product/:id',authMiddleware, getProductById);
router.put('/product/update/:id',authMiddleware, updateProductById);
router.delete('/product/:id',authMiddleware, deleteProductById);
export default router;
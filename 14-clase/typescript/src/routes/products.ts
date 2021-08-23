import express from 'express';
import {
  listAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
  deleteProduct,
} from '../controllers/products.controllers';

const router = express.Router();

router.get('/listAllProducts', listAllProducts);

router.get('/list/:id', getProductById);

router.post('/save', addNewProduct);

router.put('/edit/:id', editProduct);

router.delete('/delete/:id', deleteProduct);

export default router;

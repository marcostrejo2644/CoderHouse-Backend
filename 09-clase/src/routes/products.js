import express from 'express';
import {
  getItem,
  getItemById,
  addItem,
  editItem,
  deleteItem,
} from '../controllers/products.controller';

const router = express.Router();

router.get('/list', getItem);

router.get('/list/:id', getItemById);

router.post('/save', addItem);

router.put('/actualizar/:id', editItem);

router.delete('/borrar/:id', deleteItem);

export default router;

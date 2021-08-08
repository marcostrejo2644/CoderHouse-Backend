import express from 'express';
import {
  getItem,
  getItemById,
  addItem,
  editItem,
  deleteItem,
  viewItems,
} from '../controllers/products.controller';

const router = express.Router();

router.get('/view', viewItems);

router.get('/list', getItem);

router.get('/list/:id', getItemById);

router.post('/save', addItem);

router.put('/edit/:id', editItem);

router.delete('/delete/:id', deleteItem);

export default router;

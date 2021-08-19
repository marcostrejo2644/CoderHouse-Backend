import express from 'express';
import {
  getItemById,
  addItem,
  editItem,
  deleteItem,
  listItems,
} from '../controllers/products.controller';

const router = express.Router();

router.get('/list/all', listItems);

router.get('/list/:id', getItemById);

router.post('/save', addItem);

router.put('/edit/:id', editItem);

router.delete('/delete/:id', deleteItem);

export default router;

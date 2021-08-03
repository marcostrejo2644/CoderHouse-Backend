import express from 'express';
import {
  getItem,
  getItemById,
  addItem,
} from '../controllers/products.controller';

const router = express.Router();

router.get('/list', getItem);

router.get('/list/:id', getItemById);

router.post('/save', addItem);

export default router;

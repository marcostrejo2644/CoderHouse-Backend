import express from 'express';
import {
  getItems,
  randomItem,
  getVisits,
} from '../controllers/items.controllers';

const router = express.Router();

router.get('/items', getItems);

router.get('/item-random', randomItem);

router.get('/visitas', getVisits);

export default router;

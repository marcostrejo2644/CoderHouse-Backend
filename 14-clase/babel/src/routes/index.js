import express from 'express';
import { renderForm } from '../controllers/index.controller';

const router = express.Router();

router.get('/', renderForm);

export default router;

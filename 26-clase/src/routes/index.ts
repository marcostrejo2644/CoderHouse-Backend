import express from 'express';
import { renderForm } from '../controllers/index.controller';
import passport from 'passport';

const router = express.Router();

router.get('/', renderForm);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

export default router;

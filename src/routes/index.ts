import path from 'path';
import os from 'os';
import express from 'express';
// import { renderForm } from '../controllers/index.controller';
import passport from 'passport';
import { fork } from 'child_process';

const randomFunction = path.resolve(__dirname, '../middleware/getRandoms');

const router = express.Router();

router.get('/', (req: any, res: any) => res.render('form'));

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/info', (req, res) => {
  let data = {
    processId: process.pid,
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    cpus: os.cpus().length,
  };
  res.json(data);
});

// Process
router.get('/randoms', (req, res) => {
  let numeros: number = req.query.cant ? Number(req.query.cant) : 100000000;
  const randoms = fork(randomFunction);
  const msg = { command: 'start', cantidad: numeros };
  randoms.send(JSON.stringify(msg));
  randoms.on('message', (result) => {
    res.json(result);
  });
});

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/kill', (req, res) => {
  process.exit(0);
});

export default router;

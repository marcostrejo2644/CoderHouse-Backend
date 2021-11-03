import path from 'path';
import * as http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from './middlewares/auth';
import { socketService } from './services/socketIo';
import { StoreOptions } from './config/storeMongo';
import compression from 'compression';
import log4js from 'log4js';

import './services/db';

import apiRoute from './routes/index';
import productsRoute from './routes/products';

log4js.configure({
  appenders: {
    fileAppender: { type: 'file', filename: './logs/example-1.log' },
    warnLog: { type: 'file', filename: './logs/warn.log' },
    errorLog: { type: 'file', filename: './logs/error.log' },
    consola: { type: 'console' },
  },
  categories: {
    default: { appenders: ['fileAppender', 'consola'], level: 'error' },
    warnLog: { appenders: ['warnLog'], level: 'warn' },
    errorLog: { appenders: ['errorLog'], level: 'error' },
  },
});

const app = express();

const myHTTPServer = new http.Server(app);

socketService.initWsService(myHTTPServer);

// Settings
app.set('views', path.join(__dirname, 'views'));
const hbs = handlebars.create({
  defaultLayout: 'index.hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(cookieParser());
app.use(session(StoreOptions));
const user = 'JuanPedro';
const password = 'abc123';
export let logged = {
  islogged: false,
  isTimedOut: false,
  isDestroyed: false,
  nombre: '',
  counter: 0,
  isAdmin: false,
};

// Middle
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// Con Compression
// app.use(compression());

// Routes
app.get('/login', async (req: Request, res: Response) => {
  const logger = log4js.getLogger('warnLog');
  try {
    if (req.query) {
      const passwd = req.query;
      logger.trace('Trace');
      logger.debug('Debug');
      logger.info('Info');
      logger.warn('Warn');
      logger.error('Error');
      logger.fatal('Fatal');
      if (passwd.user == user && passwd.password == password) {
        logged.islogged = true;
        logged.counter += 1;
        logged.isAdmin = true;
        res.json({ msg: 'Welcome your autentication was successfully' });
      } else res.status(401).json({ msg: 'You are not authorize' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/logout', (req: Request, res: Response) => {
  const logger = log4js.getLogger('errorLog');
  logger.trace('Trace');
  logger.debug('Debug');
  logger.info('Info');
  logger.warn('Warn');
  logger.error('Error');
  logger.fatal('Fatal');
  req.session.destroy;
  logged.islogged = false;
  logged.isDestroyed = true;
  res.json({ msg: 'session destruida' });
});

app.use('/', apiRoute);
app.use('/api/products/', productsRoute);

app.use(express.static(path.join(__dirname, '..', 'public')));

export default myHTTPServer;

import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import * as http from 'http';
import { socketService } from './services/socketIo';

import './services/db';

import apiRoute from './routes/index';
import productsRoute from './routes/products';

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

// Middle
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', apiRoute);
app.use('/api/products/', productsRoute);

app.use(express.static(path.join(__dirname, '..', 'public')));

export default myHTTPServer;

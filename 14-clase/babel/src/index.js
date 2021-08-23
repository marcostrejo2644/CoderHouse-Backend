import express, { json } from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import moment from 'moment';
import * as http from 'http';

import products from './products';

// Init
const app = express();
const messages = [];

// Settings
app.set('port', process.env.PORT || 4000);
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
app.use('/', require(path.join(__dirname, 'routes', 'index')));
app.use('/api/products/', require(path.join(__dirname, 'routes', 'products')));

app.use(express.static(path.join(__dirname, '..', 'public')));

const myServer = http.Server(app);

// Server Ready
const server = myServer.listen(app.get('port'), () => {
  console.log(`Server on http://localhost:${app.get('port')}`);
});

server.on('error', (error) => console.log(error));

let myWebSocket = require('./services/socket.io').initialize(server);

myWebSocket.on('connection', (socket) => {
  socket.emit('products', products);

  socket.on('newProduct', () => {
    myWebSocket.emit('newProduct', products);
  });

  socket.emit('messagesHistory', messages);

  socket.on('chatMessage', (email, msg) => {
    const message = {
      email,
      time: moment().format('DD/MM/YYYY HH:MM:SS'),
      message: msg,
    };
    messages.push(message);
    myWebSocket.emit('sendMessage', message);
  });
});

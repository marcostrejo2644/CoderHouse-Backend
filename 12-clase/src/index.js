import express, { json } from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import * as http from 'http';
// import io from 'socket.io';
// import io from './services/socket.io';

import products from './products';

// Init
const app = express();

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
});

const exportSocket = myWebSocket;

export default { exportSocket };

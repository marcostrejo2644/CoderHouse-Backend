import express, { json } from 'express';
import path from 'path';
import handlebars from 'express-handlebars';

// Init
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middle
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require(path.join(__dirname, 'routes', 'index')));
app.use('/api/products/', require(path.join(__dirname, 'routes', 'products')));

// Server Ready
const server = app.listen(app.get('port'), () => {
  console.log(`Server on http://localhost:${app.get('port')}`);
});

server.on('error', (error) => console.log(error));

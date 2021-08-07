import express, { json } from 'express';
import path from 'path';
import handlebars from 'express-handlebars';

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

// Server Ready
const server = app.listen(app.get('port'), () => {
  console.log(`Server on http://localhost:${app.get('port')}`);
});

server.on('error', (error) => console.log(error));

import express, { json } from 'express';
import path from 'path';

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products/', require(path.join(__dirname, 'routes', 'products')));

const server = app.listen(app.get('port'), () => {
  console.log(`Server on http://localhost:${app.get('port')}`);
});

server.on('error', (error) => console.log(error));

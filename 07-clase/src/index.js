import express from 'express';
import path from 'path';

// Init
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Routes
app.use('/api/', require(path.join(__dirname, 'routes', 'index')));

// Server Listen
const server = app.listen(app.get('port'), () => {
  console.log(`Server on http://localhost:${app.get('port')}`);
});

server.on('error', (error) => {
  console.log(`Ups something goes wrong: `, error);
});

import mongoose from 'mongoose';

const URI = 'mongodb://127.0.0.1:27017/ecommerce';

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', (_) => {
  console.log('Database is connected to:', URI);
});

// to test the error stop mongod
db.on('error', (err) => {
  console.log(err);
});

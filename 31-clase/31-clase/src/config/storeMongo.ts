import MongoStore from 'connect-mongo';
import { URI_MONGO } from './cfg';

export const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: URI_MONGO,
  }),

  secret: process.env.SESSION_SECRET || 'Top Secret',
  resave: false,
  saveUninitialized: false,
};

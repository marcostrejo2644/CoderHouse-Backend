import dotenv from 'dotenv';
dotenv.config();

// const mongoCreds = {
//   username: 'marcostrejo2644',
//   password: 'test123',
// };

// export const URI_MONGO = `mongodb+srv://${mongoCreds.username}:${mongoCreds.password}@cluster0.cyate.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const FACEBOOK = {
  APP_ID: process.env.FACEBOOK_APP_ID || 'randomID',
  APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'randomSecret',
};

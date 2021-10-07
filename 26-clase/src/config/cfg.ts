// TODO: Configurate .env file
const mongoCreds = {
  username: 'marcostrejo2644',
  password: 'test123',
};

export const URI_MONGO = `mongodb+srv://${mongoCreds.username}:${mongoCreds.password}@cluster0.cyate.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

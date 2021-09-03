import knex from 'knex';

export const sqLiteDB = knex({
  client: 'sqlite3',
  connection: { filename: './mydb.sqlite' },
});

export const mysqlDB = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'products',
  },
  pool: { min: 0, max: 7 },
});

sqLiteDB.schema.hasTable('messages').then((exists) => {
  if (!exists) {
    sqLiteDB.schema
      .createTable('messages', (table) => {
        table.increments('id'),
          table.string('email'),
          table.string('message'),
          table.date('createat');
      })
      .then(() => {
        console.log('Tabla Creada');
      });
  } else {
    console.log('La tabla ya existe');
  }
});

mysqlDB.schema.hasTable('products').then((exists) => {
  if (!exists) {
    mysqlDB.schema
      .createTable('products', (table) => {
        table.increments('id'),
          table.string('title').notNullable,
          table.integer('price').notNullable,
          table.string('thumbnail'),
          table.date('createat');
      })
      .then(() => {
        console.log('Tabla Creada');
      });
  } else {
    console.log('La tabla ya existe');
  }
});

export default {};

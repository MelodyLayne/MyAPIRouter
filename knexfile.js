module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'melody',
      password: '1234',
      database: 'Authorization'
    },
    searchPath: ['knex', 'public'],
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: 'data/migrations',
      // tableName: 'users'
    }
  }
};

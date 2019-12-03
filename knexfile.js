module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/color_picker',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
};

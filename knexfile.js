module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/color_picker',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
};

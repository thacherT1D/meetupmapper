module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/meetupmapper'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

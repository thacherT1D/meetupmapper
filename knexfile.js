module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:3000'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

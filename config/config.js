module.exports = {
    development: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'cavisson',
      database: process.env.DB_NAME || 'bidding_platform',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql',
    },
    test: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'cavisson',
      database: process.env.DB_NAME || 'bidding_platform_test',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'cavisson',
      database: process.env.DB_NAME || 'bidding_platform',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql',
    },
  };
  
const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
const shouldUseSSL =
    process.env.DB_SSL === 'true' || (databaseUrl && process.env.DB_SSL !== 'false');

const baseOptions = {
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

if (!databaseUrl) {
    baseOptions.host = process.env.DB_HOST || 'localhost';
    baseOptions.port = process.env.DB_PORT || 5432;
}

if (shouldUseSSL) {
    baseOptions.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    };
}

const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, baseOptions)
    : new Sequelize(
          process.env.DB_NAME || 'foodie_db',
          process.env.DB_USER || 'postgres',
          process.env.DB_PASSWORD || 'postgres',
          baseOptions
      );

module.exports = sequelize;

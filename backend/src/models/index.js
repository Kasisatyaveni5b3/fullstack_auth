const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const forceSqlite = (process.env.FORCE_SQLITE || '').toString().toLowerCase() === '1' || (process.env.FORCE_SQLITE || '').toString().toLowerCase() === 'true';

let sequelize;
if (!forceSqlite && process.env.DB_HOST && process.env.DB_HOST !== '') {
  sequelize = new Sequelize(process.env.DB_NAME || 'fullstack_auth', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'example', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  });
} else {
  const storagePath = path.join(__dirname, '../../data/auth.db');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false,
  });
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize);

module.exports = db;

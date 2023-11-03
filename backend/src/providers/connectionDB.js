const { createPool } = require('mysql2/promise');

const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOSTNAME,
  MYSQL_DATABASE,
} = process.env;

const connectionDB = createPool({
  host: MYSQL_HOSTNAME || 'localhost',
  user: MYSQL_USER || 'root',
  password: MYSQL_PASSWORD || 'password',
  database: MYSQL_DATABASE || 'StoreManager',
});

module.exports = connectionDB;

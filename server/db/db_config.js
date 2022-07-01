const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
});

const CONNECTION_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(CONNECTION_CONFIG);

const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log('Error in getting connection from pool');
        return reject(err);
      }
      resolve(connection.promise());
    });
  });
};

module.exports = { getConnection, CONNECTION_CONFIG };

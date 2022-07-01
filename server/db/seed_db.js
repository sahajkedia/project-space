const mysql = require('mysql2');
const util = require('util');

const {
  CREATE_TABLE_PROJECT,
  CREATE_TABLE_RECORDS,
  CREATE_TABLE_TEACHER,
  CREATE_TABLE_SUBMISSIONS,
  CREATE_TABLE_STUDENT,
} = require('./db_table');

const { CONNECTION_CONFIG } = require('./db_config.js');

const seedDatabase = async function () {
  try {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    if (!connection) {
      throw new Error('Could not create connection');
    }
    const execQuery = util.promisify(connection.query.bind(connection));
    await createTable(execQuery);
    console.log('Created Tables Successfully! :)');
    connection.end();
  } catch (err) {
    console.error(err);
  }
};

const createTable = async function (execQuery) {
  try {
    await execQuery(CREATE_TABLE_STUDENT);
    await execQuery(CREATE_TABLE_TEACHER);
    await execQuery(CREATE_TABLE_PROJECT);
    await execQuery(CREATE_TABLE_RECORDS);
    await execQuery(CREATE_TABLE_SUBMISSIONS);
  } catch (err) {
    throw err;
  }
};

seedDatabase();

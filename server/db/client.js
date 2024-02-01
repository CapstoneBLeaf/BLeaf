const { Client } = require('pg');

const dbName = "bleaf"
const client = new Client(`postgres://localhost:5431/bleaf`)

module.exports = client;

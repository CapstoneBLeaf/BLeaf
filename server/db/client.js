const { Client } = require('pg');

const dbName = "bleaf"
const client = new Client(`postgres://localhost:5431/${dbName}`)

module.exports = client;

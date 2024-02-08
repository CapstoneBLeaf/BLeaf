const { Client } = require("pg");
const dbName = "bleaf";
const client = new Client(`postgres://bleaf_user:c2IJZIAEu8Ngxd6b8yTjg726lDFOtnSn@dpg-cn2inf8l6cac739e4m30-a/${dbName}`);

module.exports = client;

const client = require("../client");

const createUsers = async ({username,firstname,lastname,email,password}) => {
  try {
    const { rows: [users] } = await client.query(`
            INSERT INTO users(username,firstname,lastname,email,password)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *;
            `,
      [username, firstname, lastname, email, password]
    );
    return users;
  } catch (error) {
    throw error;
  }
};

const getUsersByUsername = async (username) => {
  const {
    rows: [users],
  } = await client.query(`
    SELECT * FROM users WHERE users.username = '${username}';
    `);
  return users;
};

module.exports = { createUsers, getUsersByUsername };

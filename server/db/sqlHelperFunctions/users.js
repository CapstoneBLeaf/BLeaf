const client = require("../client");

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
                SELECT * FROM users;
            `);
    return rows;
  } catch (error) {
    throw error;
  }
}

const createUsers = async ({
  username,
  firstname,
  lastname,
  email,
  password,
}) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username,firstname,lastname,email,password)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *;
            `,
      [username, firstname, lastname, email, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ username }) => {
  try {
    const {
      rows: [user],
    } = await client.query("SELECT * FROM users WHERE users.username = $1", [
      username,
    ]);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUsersById = async (id) => {
  const {
    rows: [users],
  } = await client.query(`
    SELECT * FROM users WHERE users.id = '${id}';
    `);
  return users;
};

const getUsersByUsername = async (username) => {
  const {
    rows: [users],
  } = await client.query(`
    SELECT * FROM users WHERE users.username = '${username}';
    `);
  return users;
};

async function deleteUser(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    DELETE FROM users
    WHERE id=$1
    RETURNING *;
  `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

growth_states = `SELECT * from growth_states where id=0`;
growth_states; // url1

module.exports = {
  getAllUsers,
  createUsers,
  getUsersById,
  deleteUser,
  loginUser,
  getUsersByUsername,
};

const client = require("../client");
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../secrets')

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

const createUsers = async ({username,firstname,lastname,email,password}) => {
  try {
    const { rows: [user] } = await client.query(`
            INSERT INTO users(username,firstname,lastname,email,password)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *;
            `,
      [username, firstname, lastname, email, password]
    );
    const token = jwt.sign({username: username}, JWT_SECRET);
    return token;
  } catch (error) {
    throw error;
  }
};

const loginUser = async({username, password}) => {
   try { 
    const  { rows: [user] } = await client.query("SELECT * FROM users WHERE users.username = $1", [username])
    if (password != user.password) {
      console.log("wrong password")
    } else {
      const token = jwt.sign({username: username}, JWT_SECRET);
      return token;
    }
  } catch (error) {
    throw error;
  }
}

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
      const { rows: [user] } = await client.query(`
    DELETE FROM users
    WHERE id=$1
    RETURNING *;
  `, [id]);
      return user;
  } catch (error) {
      throw error;
  }
}

growth_states = `SELECT * from growth_states where id=0`
growth_states // url1



module.exports = { getAllUsers, createUsers, getUsersById, deleteUser, loginUser , getUsersByUsername};

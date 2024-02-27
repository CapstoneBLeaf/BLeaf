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
  firstname,
  lastname,
  username,
  email,
  password,
  plant_birth_date,
  growth_level
}) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(firstname,lastname,username,email,password, plant_birth_date, growth_level)
      VALUES($1,$2,$3,$4,$5, $6, $7)
      RETURNING *;
            `,
      [
        firstname,
        lastname,
        username,
        email,
        password,
        plant_birth_date,
        growth_level,
      ]
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
  SELECT users.*, growth_levels.image AS plant_image FROM users 
  JOIN growth_levels
    ON users.growth_level = growth_levels.id
  WHERE users.id = '${id}';
    `);
  return users;
};

const getUsersByUsername = async (username) => {
  const {
    rows: [user],
  } = await client.query(
    `
    SELECT * FROM users WHERE users.username = $1;
    `,
    [username]
  );
  return user;
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

async function updateUser(userId, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
    UPDATE users
    SET ${setString}
    WHERE id=${userId}
    RETURNING *;
  `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
}

growth_states = `SELECT * from growth_states where id=0`;
growth_states;

module.exports = {
  getAllUsers,
  createUsers,
  getUsersById,
  deleteUser,
  loginUser,
  updateUser,
  getUsersByUsername,
};

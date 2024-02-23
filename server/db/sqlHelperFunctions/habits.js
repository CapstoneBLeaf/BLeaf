const client = require("../client");

async function getAllHabits() {
  try {
    const { rows } = await client.query(`
                SELECT * FROM habits;
            `);
    return rows;
  } catch (error) {
    throw error;
  }
}

const createHabits = async ({ description, image, checkIn }) => {
  try {
    const {
      rows: [habits],
    } = await client.query(
      `
            INSERT INTO habits(description, image, "checkIn")
            VALUES($1,$2,$3)
            RETURNING *;
            `,
      [description, image, checkIn]
    );
    return habits;
  } catch (error) {
    throw error;
  }
};

const getHabitsById = async (habitId) => {
  const {
    rows: [habits],
  } = await client.query(`
  SELECT * FROM habits WHERE "id" = ${habitId};
    `);
  return habits;
};

const updateHabits = async (id, fields) => {
  try {
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let habits;

    if (util.dbFields(toUpdate).insert.length > 0) {
      const { rows } = await client.query(
        `
            UPDATE habits
            SET ${util.dbFields(toUpdate).insert}
            WHERE id=${id}
            RETURNING *;
          `,
        Object.values(toUpdate)
      );
      habits = rows[0];
    }

    return habits;
  } catch (error) {
    throw error;
  }
};

const deleteHabits = async (habitId) => {
  try {
    const { habits } = await client.query(
      'DELETE FROM habits WHERE "id"=$1 RETURNING *',
      [habitId]
    );
    return habits;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllHabits,
  createHabits,
  getHabitsById,
  updateHabits,
  deleteHabits,
};

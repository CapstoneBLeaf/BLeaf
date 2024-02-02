const client = require("../client");

const createGoals = async ({ name, frequency, achivements, habitId }) => {
  try {
    const {
      rows: [goals],
    } = await client.query(
      `
            INSERT INTO goals(name, frequency, achivements, "habitId")
            VALUES($1,$2,$3,$4)
            RETURNING *;
            `,
      [name, frequency, achivements, habitId]
    );
    return goals;
  } catch (error) {
    throw error;
  }
};

const getGoalsById = async (goalId) => {
  try {
    const {
      rows: [goals],
    } = await client.query('DELETE FROM habits WHERE "id"=$1 RETURNING *', [
      goalId,
    ]);
    return goals;
  } catch (error) {
    throw error;
  }
};

module.exports = { createGoals, getGoalsById };

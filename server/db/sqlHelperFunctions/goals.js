const client = require("../client");

async function getAllGoals() {
  try {
    const { rows } = await client.query(`
                SELECT * FROM goals;
            `);
    return rows;
  } catch (error) {
    throw error;
  }
}

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
    } = await client.query('DELETE FROM goals WHERE "id"=$1 RETURNING *', [
      goalId,
    ]);
    return goals;
  } catch (error) {
    throw error;
  }
};

async function updateGoal(goalId, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [goal],
    } = await client.query(
      `
    UPDATE goals
    SET ${setString}
    WHERE id=${goalId}
    RETURNING *;
  `,
      Object.values(fields)
    );

    return goal;
  } catch (error) {
    throw error;
  }
}

async function deleteGoal(goalId) {
  try {
    const {
      rows: [goal],
    } = await client.query(
      `
    DELETE FROM goals
    WHERE id=$1
    RETURNING *;
  `,
      [goalId]
    );
    return goal;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllGoals,
  createGoals,
  getGoalsById,
  deleteGoal,
  updateGoal,
};

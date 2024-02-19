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

async function createGoals({ frequency, statement, habitId, userId }) {
  try {
    const {
      rows: [goals],
    } = await client.query(
      `
            INSERT INTO goals(frequency, statement, "habitId", "userId")
            VALUES($1,$2,$3,$4)
            RETURNING *;
            `,
      [frequency, statement, habitId, userId]
    );
    return goals;
  } catch (error) {
    throw error;
  }
}

async function getGoalsByUserId(userId) {
  try {
    const returnList = [];
    const { rows: goals } = await client.query(
      `SELECT * FROM goals WHERE "userId"=${userId}`
    );
    const { rows: habits } = await client.query(`SELECT * FROM habits`, []);
    for (const goal of goals) {
      const habit = habits.find((it) => it.id === goal.habitId);
      returnList.push({
        goalId: goal.id,
        frequency: goal.frequency,
        statement: goal.statement,
        ...habit,
      });
    }
    return returnList;
  } catch (error) {
    throw error;
  }
}

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
    WHERE id=${goalId}
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
  getGoalsByUserId,
  deleteGoal,
  updateGoal,
};

const client = require("../client");

async function getAllActivity() {
  try {
    const { rows } = await client.query(`
                SELECT * FROM activity;
            `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function addHabit(userId, habitId) {
  try {
    const { rows: activity } = await client.query(
      `
      INSERT INTO activity ("userId", "habitId")
      VALUES($1, $2)
      RETURNING *;
      `,
      [userId, habitId]
    );
    return activity;
  } catch (error) {
    throw new Error(
      `adding like to exercise did not work because: ${error.message}`
    );
  }
}
async function getActivityByUserId(userId) {
  try {
    const returnList = [];
    const { rows: activity } = await client.query(
      'SELECT * FROM activity WHERE "userId"=$1',
      [userId]
    );
    const { rows: habits } = await client.query(`SELECT * FROM habits`, []);
    for (const act of activity) {
      const habit = habits.find((it) => it.id === act.habitId);
      returnList.push({
        activityId: act.id,
        completed_at: act.completed_at,
        ...habit,
      });
    }
    return returnList;
  } catch (error) {
    throw error;
  }
}

async function updateActivity(activityId, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    UPDATE activity
    SET ${setString}
    WHERE id=${activityId}
    RETURNING *;
  `,
      Object.values(fields)
    );

    return activity;
  } catch (error) {
    throw error;
  }
}

async function deleteActivity(userId, habitId) {
  try {
    const { rows: activity } = await client.query(
      `
      DELETE FROM activity 
      WHERE "userId"=$1 AND "habitId"=$2 
      RETURNING *
      `,
      [userId, habitId]
    );
    return activity;
  } catch (error) {
    throw new Error("removing activity from habit did not work, try again :(");
  }
}

async function getLatestActivityDatebyUserId(userId) {
  try { 
    const { rows: activity} = await client.query(
      `
      SELECT DATE(completed_at) FROM activity 
      WHERE "userId"=$1 
      SORT BY completed_at DESC
      LIMIT(1)
      `,
      [userId]
    );
  } catch (error) {
    console.log(error)
    throw new Error("get latest activity failed")
  }
}

module.exports = {
  getAllActivity,
  getActivityByUserId,
  updateActivity,
  deleteActivity,
  addHabit,
  getLatestActivityDatebyUserId,
};

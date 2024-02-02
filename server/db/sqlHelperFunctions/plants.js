const client = require("../client");

const createPlants = async ({
  name,
  color,
  growth_level,
  birth_date,
  userId,
}) => {
  try {
    const {
      rows: [plants],
    } = await client.query(
      `
            INSERT INTO plants(name,color,growth_level,birth_date,"userId")
            VALUES($1,$2,$3,$4,$5)
            RETURNING *;
            `,
      [name, color, growth_level, birth_date, userId]
    );
    return plants;
  } catch (error) {
    throw error;
  }
};

const getPlantsById = async (plantId) => {
  try {
    const {
      rows: [plants],
    } = await client.query(`
  SELECT * FROM plants WHERE "id" = ${plantId};
    `);
    return plants;
  } catch (error) {
    throw error;
  }
};

module.exports = { createPlants, getPlantsById };

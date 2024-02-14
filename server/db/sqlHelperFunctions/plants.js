const client = require("../client");

async function getAllPlants() {
  try {
    const { rows } = await client.query(`
                SELECT * FROM plants;
            `);
    return rows;
  } catch (error) {
    throw error;
  }
}

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
  SELECT plants.*, growth_levels.image AS image FROM plants WHERE "id" = ${plantId} 
  JOIN growth_levels
    ON plants.growth_level = growth_levels.id;
    `);
    return plants;
  } catch (error) {
    throw error;
  }
};

async function updatePlants(plantId, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [plant],
    } = await client.query(
      `
    UPDATE plants
    SET ${setString}
    WHERE id=${plantId}
    RETURNING *;
  `,
      Object.values(fields)
    );

    return plant;
  } catch (error) {
    throw error;
  }
}

async function deletePlants(plantId) {
  try {
    const {
      rows: [plant],
    } = await client.query(
      `
    DELETE FROM plants
    WHERE id=$1
    RETURNING *;
  `,
      [plantId]
    );
    return plant;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPlants,
  getPlantsById,
  getAllPlants,
  updatePlants,
  deletePlants,
};

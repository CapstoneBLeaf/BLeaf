const client = require("../client");

async function getAllJournals() {
  try {
    const { rows } = await client.query(`
                SELECT * FROM journals;
            `);
    return rows;
  } catch (error) {
    throw error;
  }
}

const createJournals = async ({ entry, date, userId }) => {
  try {
    const {
      rows: [journals],
    } = await client.query(
      `
            INSERT INTO journals(entry, date, "userId")
            VALUES($1,$2,$3)
            RETURNING *;
            `,
      [entry, date, userId]
    );
    return journals;
  } catch (error) {
    throw error;
  }
};

const getJournalsById = async (journalId) => {
  try {
    const {
      rows: [journals],
    } = await client.query('DELETE FROM journals WHERE "id"=$1 RETURNING *', [
      journalId,
    ]);
    return journals;
  } catch (error) {
    throw error;
  }
};

// const updateJournals = async (id, fields) => {
//   try {
//     const toUpdate = {};
//     for (let column in fields) {
//       if (fields[column] !== undefined) toUpdate[column] = fields[column];
//     }
//     let journals;

//     if (util.dbFields(toUpdate).insert.length > 0) {
//       const { rows } = await client.query(
//         `
//               UPDATE journals
//               SET ${util.dbFields(toUpdate).insert}
//               WHERE id=${id}
//               RETURNING *;
//             `,
//         Object.values(toUpdate)
//       );
//       journals = rows[0];
//     }

//     return journals;
//   } catch (error) {
//     throw error;
//   }
// };

async function updateJournals(journalId, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [journal],
    } = await client.query(
      `
    UPDATE journals
    SET ${setString}
    WHERE id=${journalId}
    RETURNING *;
  `,
      Object.values(fields)
    );

    return journal;
  } catch (error) {
    throw error;
  }
}

async function deleteJournals(journalId) {
  try {
    const {
      rows: [journal],
    } = await client.query(
      `
    DELETE FROM journals
    WHERE id=$1
    RETURNING *;
  `,
      [journalId]
    );
    return journal;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllJournals,
  createJournals,
  getJournalsById,
  updateJournals,
  deleteJournals,
};

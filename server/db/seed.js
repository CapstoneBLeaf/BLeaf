const client = require("./client");
const {
  users,
  habits,
  goals,
  growth_levels,
} = require("./seedData");
const { createUsers } = require("./sqlHelperFunctions/users");
const { createHabits } = require("./sqlHelperFunctions/habits");
const { createGoals } = require("./sqlHelperFunctions/goals");
const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS goals;
    DROP TABLE IF EXISTS habits;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS growth_levels;
    `);
    console.log("Table Dropped!");
  } catch (error) {
    console.log("Error dropping table:", error);
  }
};

const createTable = async () => {
  try {
    console.log("building tables..");
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      firstname varchar(50) NOT NULL,
      lastname varchar(50) NOT NULL,
      username varchar(50) NOT NULL,
      email varchar(50) NOT NULL,
      password varchar(255) NOT NULL
    );

    CREATE TABLE growth_levels(
      id SERIAL PRIMARY KEY,
      image TEXT NOT NULL
    );

    CREATE TABLE habits (
      id SERIAL PRIMARY KEY,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      "checkIn" BOOLEAN
    );
    CREATE TABLE goals (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      frequency VARCHAR(50) NOT NULL,
      achivements TEXT NOT NULL,
      "habitId" INTEGER REFERENCES habits(id) NOT NULL
  );
    `);
    console.log("Table Created!");
  } catch (error) {
    console.error(error);
  }
};
const createInitialUsers = async () => {
  try {
    for (const user of users) {
      await createUsers(user);
    }
    console.log("created users");
  } catch (error) {
    throw error;
  }
};

const createInitialHabits = async () => {
  try {
    for (const habit of habits) {
      await createHabits(habit);
    }
    console.log("created habits");
  } catch (error) {
    throw error;
  }
};

const createInitialGoals = async () => {
  try {
    for (const goal of goals) {
      await createGoals(goal);
    }
    console.log("created goals");
  } catch (error) {
    throw error;
  }
};

const createInitialGrowthLevels = async () => {
  try {
    await insertGrowthLevels();
    console.log("created growth levels");
  } catch (error) {
    throw error;
  }
};

const insertGrowthLevels = async () => {
  for (const growth_level of growth_levels) {
    const {
      rows: [levels],
    } = await client.query(
      `
            INSERT INTO growth_levels(image)
            VALUES($1)
            RETURNING *;
            `,
      [growth_level.plantImg]
    );
  }
};

const buildDb = async () => {
  try {
    client.connect();
    await dropTables();
    await createTable();
    await createInitialUsers();
    await createInitialGrowthLevels();
    await createInitialHabits();
    await createInitialGoals();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

buildDb();

const client = require("./client");
const { users, habits, goals, growth_levels } = require("./seedData");
const { createUsers } = require("./sqlHelperFunctions/users");
const { createHabits } = require("./sqlHelperFunctions/habits");
const { createGoals } = require("./sqlHelperFunctions/goals");
const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS activity CASCADE;
    DROP TABLE IF EXISTS goals CASCADE;
    DROP TABLE IF EXISTS habits CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS growth_levels CASCADE;
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
    CREATE TABLE growth_levels(
      id SERIAL PRIMARY KEY,
      image TEXT NOT NULL
    );
    
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      firstname varchar(50) NOT NULL,
      lastname varchar(50) NOT NULL,
      username varchar(50) UNIQUE NOT NULL,
      email varchar(50) NOT NULL,
      password varchar(255) NOT NULL,
      growth_level INT REFERENCES growth_levels(id) NOT NULL,
      plant_birth_date DATE NOT NULL
    );
    CREATE TABLE habits (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      "checkIn" BOOLEAN
    );
    CREATE TABLE goals (
      id SERIAL PRIMARY KEY,
      frequency TEXT NOT NULL,
      statement TEXT NOT NULL,
      "userId" INTEGER NOT NULL,
      "habitId" INTEGER REFERENCES habits(id) NOT NULL,
      FOREIGN KEY("userId") REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE activity (
      id SERIAL PRIMARY KEY,
      "habitId" INTEGER REFERENCES habits(id) NOT NULL,
      "userId" INTEGER NOT NULL,
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY("userId") REFERENCES users(id) ON DELETE CASCADE
  );
    `);
    console.log("Tables Created!");
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
    await createInitialGrowthLevels();
    await createInitialUsers();
    await createInitialHabits();
    await createInitialGoals();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

buildDb();

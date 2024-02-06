const client = require("./client");
const { users, plants, habits, goals, journals } = require("./seedData");
const { createUsers } = require("./sqlHelperFunctions/users");
const { createPlants } = require("./sqlHelperFunctions/plants");
const { createHabits } = require("./sqlHelperFunctions/habits");
const { createGoals } = require("./sqlHelperFunctions/goals");
const { createJournals } = require("./sqlHelperFunctions/journals");
const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS plants;
    DROP TABLE IF EXISTS journals;
    DROP TABLE IF EXISTS goals;
    DROP TABLE IF EXISTS habits;
    DROP TABLE IF EXISTS users;
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
      username varchar(50) NOT NULL,
      firstname varchar(50) NOT NULL,
      lastname varchar(50) NOT NULL,
      email varchar(50) NOT NULL,
      password varchar(255) NOT NULL
    );
    CREATE TABLE plants(
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      growth_level INT NOT NULL,
      birth_date DATE NOT NULL,
      "userId" INTEGER REFERENCES users(id) NOT NULL
    );
    CREATE TABLE habits (
      id SERIAL PRIMARY KEY,
      description TEXT [] NOT NULL,
      image TEXT [] NOT NULL,
      "checkIn" BOOLEAN
    );
    CREATE TABLE goals (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      frequency VARCHAR(50) NOT NULL,
      achivements TEXT NOT NULL,
      "habitId" INTEGER REFERENCES habits(id) NOT NULL
  );
  CREATE TABLE journals (
      id SERIAL PRIMARY KEY,
      entry TEXT NOT NULL,
      date DATE,
      "userId" INTEGER REFERENCES users(id) NOT NULL
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
const createInitialPlants = async () => {
  try {
    for (const plant of plants) {
      await createPlants(plant);
    }
    console.log("created plants");
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

const createInitialJournals = async () => {
  try {
    for (const journal of journals) {
      await createJournals(journal);
    }
    console.log("created journals");
  } catch (error) {
    throw error;
  }
};

const buildDb = async () => {
  try {
    client.connect();
    await dropTables();
    await createTable();
    await createInitialUsers();
    await createInitialPlants();
    await createInitialHabits();
    await createInitialGoals();
    await createInitialJournals();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

buildDb();
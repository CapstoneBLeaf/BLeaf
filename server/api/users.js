const express = require("express");
const router = express.Router();
const { authRequired } = require("./util");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const {
  createUsers,
  getUsersById,
  getAllUsers,
  deleteUser,
  loginUser,
  getUsersByUsername,
} = require("../db/sqlHelperFunctions/users");

router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const users = await getUsersById(req.params.id);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUsers({
      firstname,
      lastname,
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
      plant_birth_date: new Date(),
      growth_level: 1,
    });

    delete user.password;
    const token = jwt.sign(user, JWT_SECRET);
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    delete user.password;
    res.send({ token, user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await getUsersByUsername(req.body.username.toLowerCase());
    if (user == null) {
      res.status(401).send({ error: "Invalid username or password" });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      delete user.password;
 
      res.send({ token, user });
    } else {
      res.status(401).send({ error: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { authRequired } = require("./util");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const {
  createUsers,
  getUsersById,
  getAllUsers,
  deleteUser,
  loginUser,
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
    const token = await createUsers(req.body);

    res.cookie("token", token, {
      sameSite: "strict",
    });
    res.send({ token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const token = await loginUser(req.body);

    res.cookie("token", token, {
      sameSite: "strict",
    });
    res.send({ token });
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

// add 404 if no user and 403 wrong password

module.exports = router;

const express = require("express");
const router = express.Router();
const { authRequired } = require("./util");
const {
  getAllHabits,
  getHabitsById,
  createHabits,
  deleteHabits,
  updateHabits,
} = require("../db/sqlHelperFunctions/habits");

router.get("/", async (req, res, next) => {
  try {
    const habits = await getAllHabits();
    res.send(habits);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const habit = await getHabitsById(req.params.id);
    res.send(habit);
  } catch (error) {
    next(error);
  }
});

router.post("/", authRequired, async (req, res, next) => {
  try {
    const habit = await createHabits(req.body);
    res.send(habit);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const habit = await deleteHabits(req.params.id);
    res.send(habit);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authRequired, async (req, res, next) => {
  try {
    const habit = await updateHabits(req.params.id, req.body);
    res.send(habit);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

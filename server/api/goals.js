const express = require("express");
const router = express.Router();
const { authRequired } = require("./util");
const {
  getAllGoals,
  getGoalsByUserId,
  updateGoal,
  createGoals,
  deleteGoal,
} = require("../db/sqlHelperFunctions/goals");

router.get("/", async (req, res, next) => {
  try {
    const goals = await getAllGoals();
    res.send(goals);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const goal = await getGoalsByUserId(req.params.id);
    res.send(goal);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/add", async (req, res, next) => {
  try {
    const goal = await createGoals(req.body.userId, req.params.id);
    res.send(goal);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const goal = await deleteGoal(req.params.id);
    res.send(goal);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const goal = await updateGoal(req.params.id, req.body);
    res.send(goal);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

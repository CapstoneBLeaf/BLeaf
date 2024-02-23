const express = require("express");
const router = express.Router();
const { authRequired } = require("./util");
const {
  getAllGoals,
  getGoalsById,
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

router.get("/:id", async (req, res, next) => {
  try {
    const goal = await getGoalsById(req.params.id);
    res.send(goal);
  } catch (error) {
    next(error);
  }
});

router.post("/", authRequired, async (req, res, next) => {
  try {
    const goal = await createGoals(req.body);
    res.send(goal);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const goal = await deleteGoal(req.params.id);
    res.send(goal);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authRequired, async (req, res, next) => {
  try {
    const goal = await updateGoal(req.params.id, req.body);
    res.send(goal);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

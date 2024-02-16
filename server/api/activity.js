const express = require("express");
const router = express.Router();
const {
  addHabit,
  getActivityByUserId,
  deleteActivity,
  getAllActivity,
} = require("../db/sqlHelperFunctions/activity");

router.get("/", async (req, res, next) => {
  try {
    const activity = await getAllActivity(req.body);
    res.send(activity);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/add", async (req, res, next) => {
  try {
    const activity = await addHabit(req.body.userId, req.params.id);
    console.log(activity);
    res.send(activity);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id/delete", async (req, res, next) => {
  try {
    const activity = await deleteActivity(req.body.userId, req.params.id);
    res.send(activity);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const activity = await getActivityByUserId(req.params.id);
    res.send(activity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

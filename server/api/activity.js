const express = require("express");
const router = express.Router();
const {
  addHabit,
  getActivityByUserId,
  deleteActivity,
  getAllActivity,
  getLatestActivityDatebyUserId,
} = require("../db/sqlHelperFunctions/activity");

const {
  updateUser, getUsersById
} = require("../db/sqlHelperFunctions/users");


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
    const date = await getLatestActivityDatebyUserId(req.body.userId)
    const today = new Date()
    const user = await getUsersById(req.body.userId)
    console.log(`comparing: ${today}, ${date}`)
    if (today > date) {
      const updatedUser = await updateUser({
        user_id: req.body.userId, 
        fields: {
          growth_level: user.growth_level + 1
        }
      });
    }
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

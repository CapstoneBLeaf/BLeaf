const express = require("express");
const router = express.Router();
const { authRequired } = require("./util");
const {
  getAllPlants,
  getPlantsById,
  createPlants,
  updatePlants,
  deletePlants,
} = require("../db/sqlHelperFunctions/plants");

router.get("/", async (req, res, next) => {
  try {
    const plants = await getAllPlants();
    res.send(plants);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const plant = await getPlantsById(req.params.id);
    res.send(plant);
  } catch (error) {
    next(error);
  }
});

router.post("/", authRequired, async (req, res, next) => {
  try {
    const plant = await createPlants(req.body);
    res.send(plant);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authRequired, async (req, res, next) => {
  try {
    const plants = await updatePlants(req.params.id, req.body);
    res.send(plants);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const plant = await deletePlants(req.params.id);
    res.send(plant);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

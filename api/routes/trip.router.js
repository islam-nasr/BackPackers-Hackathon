const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trip.controller");
const {
  Create,
  Read,
  ReadAll,
  ReadAllOfUser,
  ReadByTourguide,
  Update,
  Delete
} = tripController;

router.post("/create/:touristID", Create);
router.get("/read/:id", Read);
router.get("/readAll", ReadAll);
router.get("/ReadAllOfUser/:id", ReadAllOfUser);
router.get("/ReadByTourguide/:tourguideID", ReadByTourguide);
router.put("/update/:id/:touristID", Update);
router.delete("/delete/:id/:touristID", Delete);

module.exports = router;

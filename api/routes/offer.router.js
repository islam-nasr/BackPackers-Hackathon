const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offer.controller");
const {
  Create,
  Accept,
  Read,
  ReadAll,
  ReadAllOfTrip,
  ReadAllMy,
  Update,
  Delete
} = offerController;

router.post("/create/:tripID/:tourguideID/:touristID", Create);
router.post("/accept/:id/:tripID/:touristID", Accept);
router.get("/read/:id", Read);
router.get("/readAll", ReadAll);
router.get("/ReadAllOfTrip/:tripID", ReadAllOfTrip);
router.get("/ReadAllMy/:tourguideID", ReadAllMy);
router.put("/update/:id/:tripID/:touristID", Update);
router.delete("/delete/:id/:tripID/:touristID", Delete);

module.exports = router;

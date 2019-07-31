const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating.controller");
const {
  CreateForPlace,
  CreateForTrip,
  CreateForTourguide,
  CreateForTourist,
  Read,
  ReadAll,
  ReadAllOfPlace,
  ReadAllOfTrip,
  ReadAllOfTourguide,
  ReadAllOfTourist,
  UpdateForPlace,
  UpdateForTrip,
  UpdateForTourguide,
  UpdateForTourist,
  DeleteForPlace,
  DeleteForTrip,
  DeleteForTourguide,
  DeleteForTourist
} = ratingController;

router.post("/CreateForPlace/:placeID/:userID", CreateForPlace);
router.post("/CreateForTrip/:tripID/:userID", CreateForTrip);
router.post("/CreateForTourguide/:tourguideID/:userID", CreateForTourguide);
router.post("/CreateForTourist/:touristID/:userID", CreateForTourist);
router.get("/read/:id", Read);
router.get("/readAll", ReadAll);
router.get("/ReadAllOfPlace/:placeID", ReadAllOfPlace);
router.get("/ReadAllOfTrip/:tripID", ReadAllOfTrip);
router.get("/ReadAllOfTourguide/:tourguideID", ReadAllOfTourguide);
router.get("/ReadAllOfTourist/:touristID", ReadAllOfTourist);
router.put("/UpdateForPlace/:id/:placeID", UpdateForPlace);
router.put("/UpdateForTrip/:id/:tripID", UpdateForTrip);
router.put("/UpdateForTourguide/:id/:tourguideID", UpdateForTourguide);
router.put("/UpdateForTourist/:id/:touristID", UpdateForTourist);
router.delete("/DeleteForPlace/:id/:placeID", DeleteForPlace);
router.delete("/DeleteForTrip/:id/:tripID", DeleteForTrip);
router.delete("/DeleteForTourguide/:id/:tourguideID", DeleteForTourguide);
router.delete("/DeleteForTourist/:id/:touristID", DeleteForTourist);

module.exports = router;

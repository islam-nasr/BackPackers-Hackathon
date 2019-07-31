const express = require("express");
const router = express.Router();
const placeController = require("../controllers/place.controller");
const { Create, Read, ReadAll, Update, Delete } = placeController;

router.post("/create", Create);
router.get("/read/:id", Read);
router.get("/readAll", ReadAll);
router.put("/update/:id", Update);
router.delete("/delete/:id", Delete);

module.exports = router;

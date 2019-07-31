const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search.controller");
const { search } = searchController;

router.post("/search", search);

module.exports = router;

const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");

// GET hero
router.get("/", heroController.getHero);

// UPDATE hero
router.put("/", heroController.updateHero);

module.exports = router;

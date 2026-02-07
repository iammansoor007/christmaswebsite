const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// GET service section
router.get("/", serviceController.getServiceSection);

// UPDATE service section
router.put("/", serviceController.updateServiceSection);

module.exports = router;
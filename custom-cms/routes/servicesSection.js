const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/servicesController");

// GET services section
router.get("/", servicesController.getServices);

// UPDATE services section
router.put("/", servicesController.updateServices);

module.exports = router;

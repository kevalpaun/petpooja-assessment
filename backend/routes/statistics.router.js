const express = require("express");
const router = express.Router();
const controller = require("../controllers/statistics.controller");

router.get("/department-highest-salary", controller.highestSalary);

router.get("/salary-range", controller.salaryRange);

router.get("/youngest-employee", controller.youngestEmployee);

module.exports = router;

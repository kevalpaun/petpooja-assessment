const express = require("express");
const router = express.Router();


const departmentRouter = require("./routes/department.router");
const employeeRouter = require("./routes/employee.router");
const statisticsRouter = require("./routes/statistics.router");

router.use("/api/departments", departmentRouter);
router.use("/api/employees", employeeRouter);
router.use("/api/statistics", statisticsRouter);

module.exports = router;

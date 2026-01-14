const express = require("express");
const router = express.Router();
const controller = require("../controllers/department.controller");

router.get("/", controller.listAllDepartments);
router.post("/", controller.createDepartment);
router.delete("/:id", controller.deleteDepartment);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/employee.controller');
const { configureMulter, handleMulterErrors } = require('../middleware/multer');
const path = require('path');

const multerMiddleware = configureMulter(
  path.join(__dirname, '../uploads/employeePhotos'),
  1024 * 1024 * 10,
  ['image/jpeg', 'image/png', 'image/jpg']
);

router.get('/', controller.listPaginatedEmployees);

router.post(
  '/',
  multerMiddleware.single('photo'),
  handleMulterErrors,
  controller.createEmployees
);

router.put(
  '/:id',
  multerMiddleware.single('photo'),
  handleMulterErrors,
  controller.updateEmployees
);

router.delete('/:id', controller.deleteEmployees);

router.get('/:id', controller.getEmployeeById);

module.exports = router;

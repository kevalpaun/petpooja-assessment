const Department = require('../models/department.model');

exports.listAllDepartments = async (req, res, next) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      Department.getAll((err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    return res.status(200).json({
      statusCode: 200,
      message: 'Departments fetched successfully',
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        message: 'Department name is required',
      });
    }

    await new Promise((resolve, reject) => {
      Department.create(name, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'Department created successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id) || Number(id) <= 0) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Valid Department id is required',
      });
    }

    const employeeCount = await new Promise((resolve, reject) => {
      Department.checkEmployeesExist(id, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    if (employeeCount?.total > 0) {
      return res.status(409).json({
        statusCode: 409,
        message:
          'Cannot delete department. Employees already exist in this department',
      });
    }

    await new Promise((resolve, reject) => {
      Department.softDelete(id, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Department deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

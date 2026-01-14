const Employee = require('../models/employee.model');

exports.listPaginatedEmployees = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    if (!page || !limit) {
      return res.status(400).json({
        statusCode: 400,
        message: 'page and limit are required',
      });
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber <= 0 ||
      limitNumber <= 0
    ) {
      return res.status(400).json({
        statusCode: 400,
        message: 'page and limit must be valid positive numbers',
      });
    }

    const result = await new Promise((resolve, reject) => {
      Employee.getPaginated(pageNumber, limitNumber, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Employees fetched successfully',
      page: pageNumber,
      limit: limitNumber,
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createEmployees = async (req, res, next) => {
  try {
    const photoPath = req.file
      ? `uploads/employeePhotos/${req.file.filename}`
      : null;

    const employeeData = {
      ...req.body,
      photo: photoPath,
    };

    await new Promise((resolve, reject) => {
      Employee.create(employeeData, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'Employee created successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEmployees = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Employee id is required',
      });
    }
    const photoPath = req.file
      ? `uploads/employeePhotos/${req.file.filename}`
      : null;

    if (photoPath) {
      req.body.photo = photoPath;
    }

    await new Promise((resolve, reject) => {
      Employee.update(id, req.body, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Employee updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployees = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Employee id is required',
      });
    }

    await new Promise((resolve, reject) => {
      Employee.softDelete(id, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid employee id',
      });
    }

    const employee = await new Promise((resolve, reject) => {
      Employee.getById(id, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    if (!employee) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Employee not found',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Employee fetched successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

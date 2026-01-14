const Statistics = require('../models/statistics.model');

exports.highestSalary = async (req, res, next) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      Statistics.departmentHighestSalary((err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Department-wise highest salary fetched successfully',
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

exports.salaryRange = async (req, res, next) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      Statistics.salaryRange((err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Salary range statistics fetched successfully',
      data: rows?.[0] || {},
    });
  } catch (error) {
    next(error);
  }
};

exports.youngestEmployee = async (req, res, next) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      Statistics.youngestEmployee((err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Youngest employee per department fetched successfully',
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

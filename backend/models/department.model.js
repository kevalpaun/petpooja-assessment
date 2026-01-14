const db = require('../config/database');

exports.getAll = (cb) => {
  db.query(
    'SELECT * FROM departments WHERE status = 1 AND deletedAt IS NULL',
    cb
  );
};

exports.create = (name, cb) => {
  db.query('INSERT INTO departments (name) VALUES (?)', [name], cb);
};

exports.softDelete = (id, cb) => {
  db.query(
    'UPDATE departments SET status = 0, deletedAt = NOW() WHERE id = ?',
    [id],
    cb
  );
};

exports.checkEmployeesExist = (departmentId, cb) => {
  const sql = `
    SELECT COUNT(*) AS total
    FROM employees
    WHERE department_id = ?
      AND status = 1
      AND deletedAt IS NULL
  `;

  db.query(sql, [departmentId], (err, rows) => {
    if (err) return cb(err);
    cb(null, rows[0]);
  });
};

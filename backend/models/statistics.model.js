const db = require("../config/database");

exports.departmentHighestSalary = (cb) => {
  const sql = `
    SELECT d.name AS department, MAX(e.salary) AS highest_salary
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    WHERE e.status = 1
      AND e.deletedAt IS NULL
      AND d.deletedAt IS NULL
    GROUP BY d.id
  `;
  db.query(sql, cb);
};


exports.salaryRange = (cb) => {
  const sql = `
    SELECT
      SUM(CASE WHEN salary BETWEEN 0 AND 50000 THEN 1 ELSE 0 END) AS '0-50000',
      SUM(CASE WHEN salary BETWEEN 50001 AND 100000 THEN 1 ELSE 0 END) AS '50001-100000',
      SUM(CASE WHEN salary > 100000 THEN 1 ELSE 0 END) AS '100000+'
    FROM employees
    WHERE status = 1 AND deletedAt IS NULL
  `;
  db.query(sql, cb);
};

exports.youngestEmployee = (cb) => {
  const sql = `
    SELECT d.name AS department, e.name,
    TIMESTAMPDIFF(YEAR, e.dob, CURDATE()) AS age
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    WHERE e.status = 1
      AND e.deletedAt IS NULL
      AND d.deletedAt IS NULL
      AND e.dob = (
        SELECT MAX(dob)
        FROM employees
        WHERE department_id = e.department_id
          AND status = 1
          AND deletedAt IS NULL
      )
  `;
  db.query(sql, cb);
};

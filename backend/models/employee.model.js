const db = require('../config/database');

exports.getPaginated = (page, limit, cb) => {
  const offset = (page - 1) * limit;

  const dataQuery = `
  SELECT 
    e.id,
    e.department_id,
    e.name,
    DATE_FORMAT(e.dob, '%Y-%m-%d') AS dob,
    e.phone,
    e.photo,
    e.email,
    e.salary,
    e.status,
    e.createdAt,
    e.updatedAt,
    e.deletedAt,
    d.name AS department_name
  FROM employees e
  JOIN departments d ON e.department_id = d.id
  WHERE e.status = 1
    AND e.deletedAt IS NULL
    AND d.deletedAt IS NULL
  LIMIT ? OFFSET ?
`;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    WHERE e.status = 1
      AND e.deletedAt IS NULL
      AND d.deletedAt IS NULL
  `;

  db.query(countQuery, (err, countResult) => {
    if (err) return cb(err);

    const total = countResult[0].total;

    db.query(dataQuery, [limit, offset], (err, rows) => {
      if (err) return cb(err);

      cb(null, {
        total,
        data: rows,
      });
    });
  });
};

exports.create = (data, cb) => {
  const sql = `
    INSERT INTO employees
    (department_id, name, dob, phone, email, salary, photo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      data.department_id,
      data.name,
      data.dob,
      data.phone,
      data.email,
      data.salary,
      data.photo,
    ],
    cb
  );
};

exports.update = (id, data, cb) => {
  const allowedFields = [
    'department_id',
    'name',
    'dob',
    'phone',
    'email',
    'salary',
    'photo',
  ];

  const fields = [];
  const values = [];

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      fields.push(`${key}=?`);
      values.push(data[key]);
    }
  }

  if (fields.length === 0) {
    return cb(new Error('No valid fields provided to update'));
  }

  const sql = `
    UPDATE employees
    SET ${fields.join(', ')}
    WHERE id=?
  `;

  values.push(id);

  db.query(sql, values, cb);
};

exports.softDelete = (id, cb) => {
  db.query(
    'UPDATE employees SET status = 0, deletedAt = NOW() WHERE id = ?',
    [id],
    cb
  );
};

exports.getById = (id, cb) => {
  const sql = `
    SELECT 
      e.id,
      e.department_id,
      e.name,
      DATE_FORMAT(e.dob, '%Y-%m-%d') AS dob,
      e.phone,
      e.photo,
      e.email,
      e.salary,
      e.status,
      e.createdAt,
      e.updatedAt,
      e.deletedAt,
      d.name AS department_name
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    WHERE e.id = ?
      AND e.status = 1
      AND e.deletedAt IS NULL
      AND d.deletedAt IS NULL
  `;

  db.query(sql, [id], (err, rows) => {
    if (err) return cb(err);

    cb(null, rows[0] || null);
  });
};

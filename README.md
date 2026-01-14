# 📘 PetPooja Assessment - (MERN Stack)

## Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (Raw SQL – No ORM)
- **Architecture:** MVC Pattern
- **Features:** Centralized Routing, Error Handling

### Frontend

- **Framework:** React.js
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v6
- **HTTP Client:** fetch

---

## Project Structure

```
petpooja-assessment/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── department.controller.js
│   │   ├── employee.controller.js
│   │   └── statistics.controller.js
│   │
│   ├── models/
│   │   ├── department.model.js
│   │   ├── employee.model.js
│   │   └── statistics.model.js
│   │
│   ├── middleware/
│   │   └── multer.js
│   │
│   ├── routes/
│   │   ├── department.router.js
│   │   ├── employee.router.js
│   │   └── statistics.router.js
│   │
│   ├── routes.js
│   ├── app.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## Database Setup

### Step 1: Create Database

```sql
CREATE DATABASE petpooja_assessment;
USE petpooja_assessment;
```

### Step 2: Create Tables

#### Departments Table

```sql
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  status TINYINT(1) DEFAULT 1,
  deletedAt DATETIME NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Employees Table

```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  dob DATE,
  phone VARCHAR(15),
  photo VARCHAR(255),
  email VARCHAR(100) UNIQUE,
  salary DECIMAL(10,2),
  status TINYINT DEFAULT 1,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

### Step 3: Insert Sample Data

#### Departments Data

```sql
INSERT INTO departments (name)
VALUES
  ('Human Resources'),
  ('Finance'),
  ('IT'),
  ('Sales'),
  ('Marketing'),
  ('Operations'),
  ('Customer Support');
```

#### Employees Data (Optional)

```sql
INSERT INTO employees (department_id, name, dob, phone, email, salary, status)
VALUES
  (1, 'Amit Sharma', '1995-03-12', '9876543210', 'amit.sharma@example.com', 45000.00, 1),
  (1, 'Ravi Kumar', '1999-01-10', '9876543217', 'ravi.kumar@example.com', 40000.00, 1),
  (1, 'Nikhil Jain', '1997-11-11', '9876543224', 'nikhil.jain@example.com', 49000.00, 1),
  (2, 'Priya Patel', '1998-07-21', '9876543211', 'priya.patel@example.com', 52000.00, 1),
  (2, 'Anjali Desai', '1995-08-22', '9876543218', 'anjali.desai@example.com', 53000.00, 1),
  (2, 'Meera Rao', '1993-02-06', '9876543225', 'meera.rao@example.com', 88000.00, 1),
  (3, 'Rahul Mehta', '1994-11-05', '9876543212', 'rahul.mehta@example.com', 60000.00, 1),
  (3, 'Suresh Yadav', '1990-04-15', '9876543219', 'suresh.yadav@example.com', 82000.00, 1),
  (3, 'Sahil Khan', '1999-09-19', '9876543226', 'sahil.khan@example.com', 42000.00, 1),
  (4, 'Neha Singh', '1997-02-18', '9876543213', 'neha.singh@example.com', 48000.00, 1),
  (4, 'Pooja Kapoor', '1996-10-09', '9876543220', 'pooja.kapoor@example.com', 47000.00, 1),
  (4, 'Isha Malhotra', '1995-12-01', '9876543227', 'isha.malhotra@example.com', 51000.00, 1),
  (5, 'Karan Joshi', '1993-09-30', '9876543214', 'karan.joshi@example.com', 75000.00, 1),
  (5, 'Manish Gupta', '1991-05-28', '9876543221', 'manish.gupta@example.com', 90000.00, 1),
  (5, 'Rohit Bansal', '1992-06-24', '9876543228', 'rohit.bansal@example.com', 95000.00, 1),
  (6, 'Sneha Nair', '1996-06-14', '9876543215', 'sneha.nair@example.com', 55000.00, 1),
  (6, 'Divya Iyer', '1998-03-03', '9876543222', 'divya.iyer@example.com', 56000.00, 1),
  (6, 'Kavya Reddy', '1996-01-29', '9876543229', 'kavya.reddy@example.com', 57000.00, 1),
  (7, 'Vikas Verma', '1992-12-25', '9876543216', 'vikas.verma@example.com', 68000.00, 1),
  (7, 'Arjun Shah', '1994-07-17', '9876543223', 'arjun.shah@example.com', 70000.00, 1);
```

---

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=petpooja_assessment
```

### 4. Start Development Server

```bash
npm run dev
```

**Backend Server:** `http://localhost:3000`

---

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:3000
```

### 4. Start Development Server

```bash
npm run dev
```

**Frontend Application:** `http://localhost:5173`

---

## API Testing

Import the Postman collection located at:

```
postman-collection/Petpooja Assesment.postman_collection.json
```

---

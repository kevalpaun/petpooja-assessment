import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addEmployee,
  updateEmployee,
  getEmployeeById,
  getDepartments,
} from "../api";
import "./EmployeeForm.css";

const BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:3000";

function EmployeeForm() {
  const { id } = useParams(); // new OR employee id
  const navigate = useNavigate();

  const isEdit = id !== "new";

  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    salary: "",
    department_id: "",
  });

  const [photo, setPhoto] = useState(null); // new uploaded file
  const [existingPhoto, setExistingPhoto] = useState(""); // filename from backend
  const [preview, setPreview] = useState(""); // preview URL

  // Load departments
  useEffect(() => {
    getDepartments().then((data) => {
      setDepartments(data.data);
    });
  }, []);

  // Load employee data in edit mode
  useEffect(() => {
    if (isEdit) {
      getEmployeeById(id).then((data) => {
        const emp = data.data;

        setForm({
          name: emp.name,
          dob: emp.dob?.split("T")[0] || "",
          phone: emp.phone,
          email: emp.email,
          salary: emp.salary,
          department_id: emp.department_id,
        });

        setExistingPhoto(emp.photo); // ✅ keep filename only
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhoto(file);
    setPreview(URL.createObjectURL(file)); // preview new image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, salary, department_id } = form;

    if (!name || !email || !salary || !department_id) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();

    // append only non-file fields
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    // append photo ONLY if user selected new one
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      if (isEdit) {
        await updateEmployee(id, formData);
        alert("Employee updated");
      } else {
        await addEmployee(formData);
        alert("Employee added");
      }
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="employee-form">
      <form onSubmit={handleSubmit} className="card">
        <h3>{isEdit ? "Edit Employee" : "Add Employee"}</h3>

        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} type="number" />

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Salary</label>
        <input name="salary" value={form.salary} onChange={handleChange} />

        <label>Department</label>
        <select
          name="department_id"
          value={form.department_id}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* IMAGE UPLOAD SECTION */}
        <label>Photo</label>

        <div className="image-upload">
          {/* Existing image (edit mode, no new photo selected) */}
          {existingPhoto && !preview && (
            <img
              src={`${BASE_URL}/${existingPhoto}`}
              alt="current"
              className="image-preview"
              width={200}
            />
          )}

          {/* New image preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="image-preview"
              width={200}
            />
          )}

          <input type="file" onChange={handlePhotoChange} accept="image/*"/>
        </div>

        <button type="submit">
          {isEdit ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;

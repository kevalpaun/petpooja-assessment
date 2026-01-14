const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const handleResponse = async (res) => {
  console.log("res", res);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  const data = await res.json();
  console.log("data", data);

  return data;
};

export const getEmployees = async (page, limit = 10) => {
  console.log("page", page);
  return fetch(`${BASE_URL}/api/employees?page=${page}&limit=${limit}`).then(
    handleResponse
  );
};

export const addEmployee = async (formData) => {
  return fetch(`${BASE_URL}/api/employees`, {
    method: "POST",
    body: formData, // DO NOT set headers
  }).then(handleResponse);
};
export const getDepartments = async () => {
  return fetch(`${BASE_URL}/api/departments`).then(handleResponse);
};
export const updateEmployee = async (id, formData) => {
  return fetch(`${BASE_URL}/api/employees/${id}`, {
    method: "PUT",
    body: formData,
  }).then(handleResponse);
};

export const deleteEmployee = async (id) => {
  return fetch(`${BASE_URL}/api/employees/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
};

export const getEmployeeById = async (id) => {
  return fetch(`${BASE_URL}/api/employees/${id}`).then(handleResponse);
};
export const getHighestSalary = async () => {
  return fetch(`${BASE_URL}/api/statistics/department-highest-salary`).then(
    handleResponse
  );
};

export const getSalaryRange = async () => {
  return fetch(`${BASE_URL}/api/statistics/salary-range`).then(handleResponse);
};

export const getYoungestEmployee = async () => {
  return fetch(`${BASE_URL}/api/statistics/youngest-employee`).then(
    handleResponse
  );
};

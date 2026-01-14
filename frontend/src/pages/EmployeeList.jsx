import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../redux/employeeSlice';
import { Link } from 'react-router-dom';
import { deleteEmployee } from '../api';

function EmployeeList() {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.list);
  const employeeList = employee?.data || [];
  const loading = useSelector((state) => state.employee.loading);

  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchEmployees(page, limit));
  }, [page, dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);
      alert('Employee deleted');

      // reload list
      dispatch(fetchEmployees(page));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <h3>Employee List</h3>

        <Link to="/employee/new">
          <button>Add Employee</button>
        </Link>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && employeeList?.length > 0 ? (
        <>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employeeList.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    {emp?.photo && (
                      <img
                        src={
                          emp.photo
                            ? `${process.env.REACT_APP_API_URL}/${emp.photo}`
                            : ''
                        }
                        alt={emp.name?.[0]}
                        style={{ width: '50px',height:'50px' }}
                      />
                    )}
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.department_name}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.email}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.salary}</td>
                  <td style={{ display: 'flex', gap: 10 }}>
                    <Link to={`/employee/${emp.id}`}>Edit</Link>

                    <button
                      onClick={() => handleDelete(emp.id)}
                      style={{
                        color: 'red',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />

          {/* Pagination */}
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev
          </button>

          <b style={{ margin: '0px 15px' }}>
            {`${page}/${Math.ceil(employee.total / limit)}`}
          </b>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(employee.total / limit)}
          >
            Next
          </button>
        </>
      ) : (
        !loading && <p>No employees found.</p>
      )}
    </div>
  );
}

export default EmployeeList;

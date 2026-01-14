import { useEffect, useState } from "react";
import { getHighestSalary, getSalaryRange, getYoungestEmployee } from "../api";

function Statistics() {
  const [highestSalary, setHighestSalary] = useState([]);
  const [salaryRange, setSalaryRange] = useState({});
  const [youngest, setYoungest] = useState([]);

  useEffect(() => {
    getHighestSalary().then((data) => {
      setHighestSalary(data.data);
    });
    getSalaryRange().then((data) => {
      setSalaryRange(data.data);
    });
    getYoungestEmployee().then((data) => {
      setYoungest(data.data);
    });
  }, []);

  return (
    <div>
      <h3>Statistics</h3>

      <h4>Department Wise Highest Salary</h4>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Department</th>
            <th>Hignest Salary</th>
          </tr>
        </thead>
        <tbody>
          {highestSalary.map((item, index) => (
            <tr key={index}>
              <td>{item.department}</td>
              <td>{item.highest_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Salary Range Count</h4>
      <div>0-50000: {salaryRange["0-50000"]}</div>
      <div>50001-100000: {salaryRange["50001-100000"]}</div>
      <div>100000+: {salaryRange["100000+"]}</div>

      <h4>Youngest Employee</h4>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Department</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {youngest.map((item, index) => (
            <tr key={index}>
              <td>{item.department}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;

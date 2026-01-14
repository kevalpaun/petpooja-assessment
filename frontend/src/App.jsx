import { Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import Statistics from "./pages/Statistics";
import AddUpdateEmployee from "./pages/AddUpdateEmployee";


function App() {
  return (
    <div>
      <h2>Employee Management</h2>

      {/* Simple Navigation */}
      <nav>
        <Link to="/">Employees</Link> |{" "}
        <Link to="/stats">Statistics</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<AddUpdateEmployee />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default App;

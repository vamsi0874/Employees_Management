import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../apiService';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error loading employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (empId) => {
    try {
      await deleteEmployee(empId);
      setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== empId));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete the employee. Please try again.');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="employee-list-container">
      <h1>Employees Management List</h1>
      {employees.length ? (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              <Link to={`/employee/${employee._id}`}>
                Name: {employee.name} | empID: {employee._id}
              </Link>
              <button onClick={() => handleDelete(employee._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-employees">No employees found</p>
      )}
      <button className="add-employee-button" onClick={() => navigate('/add')}>Add</button>
    </div>
  );
}

export default EmployeeList;

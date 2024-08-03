import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, deleteEmployee } from '../apiService';


const EmployeeDetail = () => {
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(empId);
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [empId]);

  const handleDelete = async (empId) => {
    try {
      await deleteEmployee(empId);
      navigate('/');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete the employee. Please try again.');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!employee) return <p className="error">Employee not found</p>;

  return (
    <div className="employee-detail-container">
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Emp ID:</strong> {employee._id}</p>
      <p><strong>Address:</strong> {`${employee.address.line1}, ${employee.address.city}, ${employee.address.country}, ${employee.address.zip}`}</p>
      <h3>Contact Methods</h3>
      <ul>
        {employee.contactMethods.map((method, index) => (
          <li key={index}>
            <strong>{method.contact_method}</strong>: {method.value}
          </li>
        ))}
      </ul>
    <div className='btn-detail'>
      <button onClick={() => handleDelete(employee._id)}>Delete</button>
      <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
};

export default EmployeeDetail;

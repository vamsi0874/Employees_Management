import axios from 'axios';

// Base URL of API
const BASE_URL = 'https://free-ap-south-1.cosmocloud.io/development/api';

// headers for Cosmocloud
const HEADERS = {
  projectId: '66acfb8d3e41ff82489861ff' , 
  environmentId: '66acfb8d3e41ff8248986200',
};

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

// Get all employees
export const getEmployees = async (limit = 10, offset = 0) => {
  try {
    const response = await api.get('/employee', {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Get a single employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await api.get(`/employee/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching employee:', error);
    throw error;
  }
};

// Create a new employee
export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/employee', employeeData);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};



export const deleteEmployee = async (id) => {
  try {
    
    const response = await api.delete(`/employee/${id}`, { data: {} });
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};


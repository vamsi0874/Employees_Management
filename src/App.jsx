import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import AddEmployee from './components/AddEmployee';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/employee/:empId" element={<EmployeeDetail />} />
      <Route path="/add" element={<AddEmployee />} />
    </Routes>
  );
};

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../apiService';


const AddEmployee = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState({ line1: '', city: '', country: '', zip: '' });
  const [contactMethods, setContactMethods] = useState([{ contact_method: 'EMAIL', value: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      name,
      address,
      contactMethods,
    };
    try {
      await createEmployee(newEmployee);
      navigate('/'); 
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('There was an error adding the employee. Please try again.');
    }
  };

  const handleContactMethodChange = (index, key, value) => {
    const newContactMethods = [...contactMethods];
    newContactMethods[index][key] = value;
    setContactMethods(newContactMethods);
  };

  const addContactMethod = () => {
    setContactMethods([...contactMethods, { contact_method: 'EMAIL', value: '' }]);
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <h3> Address</h3>
         <div className='Address'>
          <label>Line1: </label>
          <input
            type="text"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            required
          />
          <label>City: </label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
          <label>Country: </label>
          <input
            type="text"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            required
          />
          <label>Zip: </label>
          <input
            type="text"
            value={address.zip}
            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            required
          />
          </div>
        </div>
        <div className="contact-methods">
          <h3>Contact Methods</h3>
          {contactMethods.map((method, index) => (
            <div key={index}>
              <select
                value={method.contact_method}
                onChange={(e) =>
                  handleContactMethodChange(index, 'contact_method', e.target.value)
                }
              >
                <option value="EMAIL">EMAIL</option>
                <option value="PHONE">PHONE</option>
              </select>
              <input
                type="text"
                value={method.value}
                onChange={(e) => handleContactMethodChange(index, 'value', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" className="add-contact-method" onClick={addContactMethod}>
            Add Contact Method
          </button>
        </div>
       <div>
        <button onClick={()=>navigate('/')}> Back</button>
        <button type="submit">Add Employee</button>
      </div> 
      </form>
     
    </div>
  );
};

export default AddEmployee;

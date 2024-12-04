import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize navigate hook

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log form data for debugging
  
    try {
      const response = await axios.post(
        'http://localhost:5000/register', 
        formData, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSuccessMessage(response.data.message); // Set success message
      setFormData({ username: '', email: '', password: '' });
      setErrorMessage(''); // Clear any previous error message

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage(error.response?.data?.error || 'Registration failed'); // Set error message
      setSuccessMessage(''); // Clear success message if registration fails
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      {/* Display success and error messages */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Register;

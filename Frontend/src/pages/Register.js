import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function Register() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    let error = '';

    if (!value.trim()) {
      error = `${name[0].toUpperCase() + name.slice(1)} is required`;
    }

    if (name === 'email' && value && !isEmailValid(value)) {
      error = 'Invalid email format';
    }

    if (name === 'password' && value.length > 0 && value.length < 8) {
      error = 'Password must be at least 8 characters';
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => validateField(field, form[field]));

    
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setErrors({ general: 'Registration failed. Try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>REGISTER</h2>
      {errors.general && <div className="error-text">{errors.general}</div>}

      <div className="form-group">
        <label htmlFor="firstname">First Name *</label>
        <input 
          name="firstname"
          placeholder="First name" 
          value={form.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.firstname ? 'input-error' : ''}
        />
        {errors.firstname && <div className="error-text">{errors.firstname}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="lastname">Last Name *</label>
        <input 
          name="lastname"
          placeholder="Last name" 
          value={form.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.lastname ? 'input-error' : ''}
        />
        {errors.lastname && <div className="error-text">{errors.lastname}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input 
          name="email"
          placeholder="Email" 
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <div className="error-text">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <input 
          name="password"
          type="password" 
          placeholder="Password" 
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <div className="error-text">{errors.password}</div>}
      </div>

      <button 
        type="submit" 
        className="login-button"
      >
        REGISTER
      </button>
    </form>
  );
}

export default Register;

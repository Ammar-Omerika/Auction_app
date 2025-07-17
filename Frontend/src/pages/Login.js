import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
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
    Object.entries(form).forEach(([name, value]) => validateField(name, value));
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setErrors({ general: 'Login failed. Wrong email or password.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>LOGIN</h2>

      {errors.general && <div className="error-text">{errors.general}</div>}

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

      <div className="remember-me">
        <label className="custom-checkbox">
          <input type="checkbox" id="remember" />
          <span className="checkmark"></span>
          Remember me
        </label>
      </div>

      <button 
        type="submit" 
        className="login-button"
        disabled={!form.email || !form.password}
      >
        Login
      </button>
      
      <a href="#" className="forgot-password">Forgot password?</a>
    </form>
  );
}

export default Login;

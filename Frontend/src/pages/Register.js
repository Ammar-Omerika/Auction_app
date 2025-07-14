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
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form, true); 
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>REGISTER</h2>
      <div className="form-group">
        <label htmlFor="firstname">First Name</label>
        <input placeholder="First name" onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Last Name</label>
        <input placeholder="Last name" onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </div>
      <button type="submit" className="login-button">REGISTER</button>
      <div className="other-options">
        <a href="#"><img src="/images_layout/logo_fb.png" alt="Facebook" />Signup with Facebook</a>
        <a href="#"><img src="/images_layout/logo_gmail.png" alt="Gmail" />Signup with Gmail</a>
      </div>
      <div>
        <span>Already have an account? <a href="#" className="forgot-password">Login</a></span>
      </div>
    </form>
  );
}

export default Register;

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);     
    navigate('/');    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>LOGIN</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </div>
      <div className="remember-me">
        <label className="custom-checkbox">
          <input type="checkbox" id="remember" />
          <span className="checkmark"></span>
          Remember me
        </label>
      </div>

      <button type="submit" className="login-button">Login</button>
      <div className="other-options">
        <a href="#"><img src="/images_layout/logo_fb.png" alt="Facebook" />Login with Facebook</a>
        <a href="#"><img src="/images_layout/logo_gmail.png" alt="Gmail" />Login with Gmail</a>
      </div>
      <a href="#" className="forgot-password">Forgot password?</a>
    </form>
  );
}

export default Login;

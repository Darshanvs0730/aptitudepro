import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { useToast } from './Toast';
import { LogoIcon } from './Icons'; // Reuse our new icon
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    AuthService.login(username, password)
      .then(() => {
        showToast('Login successful!', 'success');
        navigate('/');
        setTimeout(() => window.location.reload(), 500);
      })
      .catch((error) => {
        const resMessage =
          error.response?.data?.message ||
          error.message ||
          'Login failed. Please try again.';
        showToast(resMessage, 'error');
        setLoading(false);
      });
  };

  return (
    <div className="auth-container">
      <div className="login-card animate-fade-in">
        <div className="login-header">
          <div style={{ marginBottom: '16px' }}>
            <LogoIcon />
          </div>
          <h2 className="login-title">Log in</h2>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <div className="label-row">
              <label className="input-label">Password</label>
              <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
            </div>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

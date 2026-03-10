import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { useToast } from './Toast';
import { LogoIcon } from './Icons';
import './Login.css'; // Reusing Login CSS for consistency

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    AuthService.register(username, email, password)
      .then((response) => {
        showToast(response.data.message || 'Registration successful!', 'success');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      })
      .catch((error) => {
        const resMessage =
          error.response?.data?.message ||
          error.message ||
          'Registration failed. Please try again.';
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
          <h2 className="login-title">Sign up</h2>
        </div>

        <form className="login-form" onSubmit={handleRegister}>
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
            <label className="input-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;

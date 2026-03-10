import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { useToast } from './Toast';
import { LogoIcon } from './Icons';
import './Login.css'; // Reusing Login CSS

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        AuthService.forgotPassword(email)
            .then((response) => {
                showToast(response.data.message, 'success');
                setLoading(false);
            })
            .catch((error) => {
                const resMessage =
                    error.response?.data?.message ||
                    error.message ||
                    'Failed to send reset email.';
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
                    <h2 className="login-title">Reset Password</h2>
                    <p className="auth-subtitle">Enter your email and we'll send you a link to reset your password</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Remember your password? <Link to="/login">Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

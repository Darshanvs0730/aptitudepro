import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { useToast } from './Toast';
import { LogoIcon } from './Icons';
import './Login.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const token = searchParams.get('token');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!token) {
            showToast('Invalid or missing token.', 'error');
            return;
        }
        if (password !== confirmPassword) {
            showToast('Passwords do not match.', 'error');
            return;
        }

        setLoading(true);

        AuthService.resetPassword(token, password)
            .then((response) => {
                showToast(response.data.message, 'success');
                setTimeout(() => navigate('/login'), 2000);
            })
            .catch((error) => {
                const resMessage =
                    error.response?.data?.message ||
                    error.message ||
                    'Failed to reset password.';
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
                    <h2 className="login-title">Set New Password</h2>
                    <p className="auth-subtitle">Please create a new password for your account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">New Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            autoFocus
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Back to <Link to="/login">Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './Profile.css';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return (
      <div className="profile-container">
        <div className="profile-error card">
          <p>Please log in to view your profile.</p>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div>
          <h1 className="profile-title">Profile</h1>
          <p className="profile-subtitle">Your account information</p>
        </div>
        <Link to="/dashboard" className="btn btn-outline">
          View Dashboard
        </Link>
      </div>

      <div className="profile-content">
        <div className="profile-card card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {currentUser.username.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <div className="info-label">
                <span className="info-icon">👤</span>
                Username
              </div>
              <div className="info-value">{currentUser.username}</div>
            </div>

            <div className="info-item">
              <div className="info-label">
                <span className="info-icon">🆔</span>
                User ID
              </div>
              <div className="info-value">#{currentUser.id}</div>
            </div>

            <div className="info-item">
              <div className="info-label">
                <span className="info-icon">📧</span>
                Email
              </div>
              <div className="info-value">{currentUser.email}</div>
            </div>

            <div className="info-item">
              <div className="info-label">
                <span className="info-icon">🔐</span>
                Roles
              </div>
              <div className="info-roles">
                {currentUser.roles && currentUser.roles.map((role, index) => (
                  <span key={index} className="role-badge">
                    {role.replace('ROLE_', '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/quiz" className="btn btn-primary btn-lg">
            Start Practice
          </Link>
          <Link to="/dashboard" className="btn btn-outline btn-lg">
            View Progress
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;

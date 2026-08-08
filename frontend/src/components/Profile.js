import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AuthService from '../services/AuthService';
import authHeader from '../services/auth-header';
import Lanyard from './Lanyard';
import './Profile.css';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      axios.get('http://localhost:8080/api/attempts/stats', { headers: authHeader() })
        .then(response => {
          const data = response.data.map(stat => ({
            name: stat.categoryName,
            Accuracy: stat.totalAttempts > 0 ? ((stat.correctAttempts / stat.totalAttempts) * 100).toFixed(1) : 0,
            Attempts: stat.totalAttempts
          }));
          setStats(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching stats", err);
          setLoading(false);
        });
    }
  }, [currentUser]);

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
        <div className="profile-card card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="profile-badge-3d" style={{ width: '100%', height: '320px', position: 'relative', marginBottom: '0', marginTop: '-2rem' }}>
             <Lanyard position={[0, -0.5, 20]} gravity={[0, -40, 0]} userName={currentUser.username} />
          </div>

          <div className="profile-info" style={{ width: '100%', marginTop: '0' }}>
            <div className="info-item">
              <div className="info-label">
                <span className="info-icon">👤</span>
                Username
              </div>
              <div className="info-value">{currentUser.username}</div>
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

        <div className="profile-card card" style={{ marginTop: '2rem' }}>
            <h2 className="profile-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Category Accuracy</h2>
            {loading ? <p>Loading stats...</p> : (
                stats.length === 0 ? <p>No attempts recorded yet. Start practicing to see your stats!</p> :
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(val) => `${val}%`} />
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Legend />
                            <Bar dataKey="Accuracy" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>

        <div className="profile-actions" style={{ marginTop: '2rem' }}>
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

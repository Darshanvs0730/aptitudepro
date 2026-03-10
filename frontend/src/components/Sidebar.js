import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoIcon, DashboardIcon, QuizIcon, ProfileIcon, LogoutIcon, SettingsIcon } from './Icons';
import './Sidebar.css';

const Sidebar = ({ logOut, currentUser }) => {
    const isAdmin = currentUser?.roles?.includes("ROLE_ADMIN");

    const handleLogOut = (e) => {
        if (window.isMidQuiz) {
            const confirmLeave = window.confirm("You have an active quiz! Your progress will be lost. Are you sure you want to log out?");
            if (!confirmLeave) {
                e.preventDefault();
                return;
            }
        }
        logOut();
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <LogoIcon />
                <span className="brand-name">AptitudePro</span>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-group">
                    <p className="nav-label">Overview</p>
                    <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </NavLink>
                </div>

                <div className="nav-group">
                    <p className="nav-label">Practice</p>
                    <NavLink to="/quiz" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <QuizIcon />
                        <span>Quizzes</span>
                    </NavLink>
                </div>

                <div className="nav-group">
                    <p className="nav-label">Account</p>
                    <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <ProfileIcon />
                        <span>Profile</span>
                    </NavLink>
                </div>

                {isAdmin && (
                    <div className="nav-group">
                        <p className="nav-label">Administration</p>
                        <NavLink to="/admin" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <SettingsIcon />
                            <span>Manage Questions</span>
                        </NavLink>
                    </div>
                )}
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile-preview">
                    <div className="user-avatar">
                        {currentUser.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{currentUser.username}</span>
                        <span className="user-role">{isAdmin ? 'Administrator' : 'Student'}</span>
                    </div>
                </div>
                <button onClick={handleLogOut} className="logout-btn" title="Logout">
                    <LogoutIcon />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

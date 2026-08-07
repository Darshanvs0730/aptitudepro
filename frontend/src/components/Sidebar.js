import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoIcon, DashboardIcon, QuizIcon, ProfileIcon, LogoutIcon, SettingsIcon } from './Icons';
import './Sidebar.css';

const Sidebar = ({ logOut, currentUser }) => {
    const isAdmin = currentUser?.roles?.includes("ROLE_ADMIN");

    const handleLogOut = (e) => {
        const message = window.isMidQuiz 
            ? "You have an active quiz! Your progress will be lost. Are you sure you want to log out?" 
            : "Are you sure you want to log out?";
            
        if (window.confirm(message)) {
            logOut();
        }
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
                    <NavLink to="/leaderboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"></path><path d="M5 20v-5"></path><path d="M11 20V9"></path><path d="M17 20v-9"></path></svg>
                        <span>Leaderboard</span>
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

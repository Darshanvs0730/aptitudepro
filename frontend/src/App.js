import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import AdminBoard from './components/AdminBoard';
import AuthService from './services/AuthService';
import ProtectedRoute from './routing/ProtectedRoute';
import { ToastProvider } from './components/Toast';
import './App.css';

function RootLayout() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setIsAdmin(false);
  };

  if (currentUser) {
    return (
      <div className="app-shell">
        <Sidebar logOut={logOut} currentUser={currentUser} />
        <main className="main-content-with-sidebar">
          <Outlet context={{ isAdmin }} />
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell-public">
      <Outlet context={{ isAdmin }} />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "quiz", element: <Quiz /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "admin", element: <AdminBoard /> }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;


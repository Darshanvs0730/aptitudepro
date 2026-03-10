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
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  const handleDismissClick = () => {
    setShowInstallButton(false);
  };

  return (
    <ToastProvider>
      <RouterProvider router={router} />
      {showInstallButton && (
        <div className="pwa-install-banner">
          <div className="pwa-banner-content">
            <img src="/logo192.png" alt="AptitudePro Icon" className="pwa-app-icon" />
            <div className="pwa-app-info">
              <h4 className="pwa-app-title">AptitudePro</h4>
              <p className="pwa-app-desc">Practice aptitude anywhere</p>
            </div>
          </div>
          <div className="pwa-banner-actions">
            <button onClick={handleDismissClick} className="pwa-btn-dismiss">
              Not now
            </button>
            <button onClick={handleInstallClick} className="pwa-btn-install">
              Install
            </button>
          </div>
        </div>
      )}
    </ToastProvider>
  );
}

export default App;


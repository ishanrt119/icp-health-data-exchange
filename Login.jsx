// Login.jsx
import React, { useState } from 'react';
import './login.css';
import { AuthClient } from '@dfinity/auth-client';

const Login = ({ onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    const authClient = await AuthClient.create();

    // Start login process
    await authClient.login({
      identityProvider: 'https://identity.ic0.app/#authorize',
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        onLogin(principal);
        setIsLoggingIn(false);
      },
      onError: () => {
        alert('Login failed');
        setIsLoggingIn(false);
      },
    });

    // Fallback in case onSuccess doesn’t get called
    const interval = setInterval(async () => {
      const isAuthenticated = await authClient.isAuthenticated();
      if (isAuthenticated) {
        clearInterval(interval);
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        onLogin(principal);
        setIsLoggingIn(false);
      }
    }, 500);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={handleLogin} disabled={isLoggingIn}>
        {isLoggingIn ? 'Logging in...' : 'Login with Internet Identity'}
      </button>
    </div>
  );
};

export default Login;

// App.jsx
import React, { useState } from 'react';
import Upload from './Upload';
import Login from './Login';
import Register from './Register';

const App = () => {
  const [principal, setPrincipal] = useState(null);
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(false);

  const handleLogin = async (p) => {
    setPrincipal(p);
    setChecking(true);

    // Simulated "check user" (always returns not registered)
    console.log("Checking if user is registered for principal:", p);
    setTimeout(() => {
      // Always treat as NOT registered
      setChecking(false);
      setUser(null); // Show registration form
    }, 1000);
  };

  const handleRegister = (userData) => {
    setUser(userData); // Save in memory
    alert("User registered (simulated)");
  };

  if (!principal) return <Login onLogin={handleLogin} />;
  if (checking) return <h2 style={{ textAlign: 'center' }}>Checking registration...</h2>;
  if (!user) return <Register principal={principal} onRegister={handleRegister} />;

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Upload Section</h1>
      <Upload />
      <h2>Welcome, {user.name}</h2>
      <p>Your role: <strong>{user.role}</strong></p>
      <p>Principal: {user.principal}</p>
    </div>
  );
};

export default App;

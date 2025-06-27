// Register.jsx
import React, { useState } from 'react';
import './register.css';

const Register = ({ principal, onRegister }) => {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!role || !name || !email) {
      alert('Please fill all fields');
      return;
    }

    const res = await fetch('/api/register-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ principal, name, email, role })
    });

    if (res.ok) {
      alert('Registration successful');
      onRegister({ principal, role, name });
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Complete Registration</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />

        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">-- Select Role --</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

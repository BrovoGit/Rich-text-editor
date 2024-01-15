//login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [err, setError] = useState(null);
  const [user, setUser] = useState(null); // Add user state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure the server address is correct
      const response = await axios.post('http://localhost:8081/auth/login', inputs);

      // Assuming response.data contains the data you expect from the server
      console.log('Login successful:', response.data);

      // Set the user state with the received data
      setUser(response.data);

      // Handle your login logic here, e.g., setting user context
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {user && (
          <div className="user-info">
            <img src={user.avatar} alt="User Avatar" />
            <span>{user.username}</span>
            {/* Add a dropdown menu with logout button */}
            <div className="avatar-dropdown">
              <button onClick={() => { /* Implement your logout logic */ }}>Logout</button>
              {/* You can add other options like change avatar, profile, etc. */}
            </div>
          </div>
        )}
        {err && <p>{err}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;


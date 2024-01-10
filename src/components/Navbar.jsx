// Navbar.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import axios from 'axios';
import Avatar from '../pages/Avatar';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleAvatarClick = () => {
    console.log("Avatar Clicked");
    setShowAvatarDropdown(!showAvatarDropdown);
  };
  

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      try {
        const formData = new FormData();
        formData.append('avatar', file);
  
        const response = await axios.post('/auth/change-avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Server response:', response.data);
  
        // Refresh the user data after changing the avatar
        const userData = await axios.get('/auth/user');
        console.log('User data after avatar change:', userData.data);
  
        setUserDetails(userData.data);
      } catch (error) {
        console.error('Error changing avatar:', error);
      }
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/auth/user');
        console.log('User Details:', response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    if (currentUser) {
      fetchUserDetails();
    }
  }, [currentUser]);
  
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Created by Sayantan" />
          </Link>
        </div>
        <div className="links">
          {currentUser && (
            <Avatar avatarUrl={currentUser.avatar} onLogout={logout} />
          )}
          <Link className="link" to="/Public-Space">
            <h6>PUBLIC SPACE</h6>
          </Link>
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=codes">
            <h6>CODES</h6>
          </Link>
          <Link className="link" to="/?cat=content">
            <h6>CONTENT</h6>
          </Link>
          <Link className="link" to="/?cat=tech">
            <h6>TECH</h6>
          </Link>
          <Link className="link" to="/?cat=edu">
            <h6>EDUCATION</h6>
          </Link>
          {currentUser && userDetails && (
            <div className="avatar-container" onClick={handleAvatarClick}>
              <img
                className="avatar"
                src={userDetails?.avatar}
                alt="User Avatar"
              />
              {showAvatarDropdown && (
                <div className="avatar-dropdown">
                  <label htmlFor="avatarInput">
                    Change Avatar
                    <input
                      id="avatarInput"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          )}
          {!currentUser ? (
            <Link className="link" to="/login">
              Login
            </Link>
          ) : null}
          <span className="write">
            <Link className="link" to="/compose">
              Ask Question
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


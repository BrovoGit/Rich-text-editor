// Avatar.jsx
import React, { useState } from 'react';

const Avatar = ({ userDetails, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="avatar-container" onClick={handleAvatarClick}>
      <img className="avatar" src={userDetails?.avatar} alt="User Avatar" />
      {showDropdown && (
        <div className="avatar-dropdown">
          <button onClick={onLogout}>Logout</button>
          {/* You can add more options here */}
        </div>
      )}
    </div>
  );
};

export default Avatar;

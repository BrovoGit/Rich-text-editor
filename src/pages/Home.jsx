import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [reviewRequest, setReviewRequest] = useState(false);
  const [user, setUser] = useState(null);
  const cat = useLocation().search;
  //const navigate = useNavigate();

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append('avatar', file);

        await axios.post('/auth/change-avatar', formData);

        // Refresh the user data after changing the avatar
        const userData = await axios.get('/user');
        setUser(userData.data);
      } catch (error) {
        console.error('Error changing avatar:', error);
      }
    } else {
      // This block is to handle the avatar preview when no file is selected
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data, including the avatar
        const userData = await axios.get("/user");
        setUser(userData.data);

        // Fetch posts if authenticated
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);

        // Notify the user about new posts
        if (res.data.length > posts.length) {
          notifyUser("New posts available!");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [cat, posts]);

  const handleLogout = () => {
    // Implement your logout logic
    // For example, clear authentication state and redirect to the login page
  };

  const getText = (html) => {
    if (!html) {
      return '';
    }
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  const notifyUser = (message) => {
    // Notification logic remains the same
    // ...
    // You can also consider using a library like react-toastify for notifications
  };

  const handleReviewRequest = () => {
    setReviewRequest(true);

    // Notify the author about the review request
    notifyUser("Someone wants to review your code!");

    // You can also send a notification to the reviewer if the author approves the request
  };

  const handleAllowReview = () => {
    setReviewRequest(false);

    // Notify the reviewer that the review request has been accepted
    notifyUser("Your code review request has been accepted!");

    // Send the code or relevant information to the reviewer
    // You may want to implement this part based on your specific requirements
  };

  if (!Array.isArray(posts) || posts.length === 0) return 'No Post yet!';

  return (
    <div className="home">
      {user && (
        <div className="user-info">
          <img src={user.avatar} alt="User Avatar" />
          <span>{user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {avatar && (
        <div className="avatar-preview">
          <img src={avatar} alt="Avatar Preview" />
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleAvatarChange} />

      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="imgs">
              <img src={`../upload/${post.img}`} alt="Post Image" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button onClick={handleReviewRequest}>Request Code Review</button>
              {reviewRequest && (
                <button onClick={handleAllowReview}>Allow Review</button>
              )}
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

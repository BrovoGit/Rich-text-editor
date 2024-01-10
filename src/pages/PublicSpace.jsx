//publicspace.js
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import { useGestureResponder } from "react-gesture-responder";

const PublicSpace = () => {
  // State to manage the content to be shared
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [sharedContent, setSharedContent] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Fetch shared content on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      const initialSharedContent = await fetchSharedContent();
      setSharedContent(initialSharedContent);
    };

    fetchInitialData();
  }, []);

  // Function to handle content submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/submit-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setContent("");
        setFile(null);

        const updatedSharedContent = await fetchSharedContent();
        setSharedContent(updatedSharedContent);
      } else {
        console.error("Failed to submit content");
      }
    } catch (error) {
      console.error("Error submitting content:", error);
    }
  };

  // Function to fetch shared content from the server
  const fetchSharedContent = async () => {
    try {
      const response = await fetch("http://localhost:8081/fetch-content");

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch shared content");
        return [];
      }
    } catch (error) {
      console.error("Error fetching shared content:", error);
      return [];
    }
  };

  // Function to handle video file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Gesture handler for the video player
  const handleDoubleTap = (_, gestureState) => {
    const { x0 } = gestureState;
    const screenWidth = window.innerWidth;
    const tapPosition = x0 / screenWidth;

    if (tapPosition < 0.33) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    } else if (tapPosition > 0.66) {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
    } else {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="public-space">
      <h2>Public Space</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
        <button type="submit">Share</button>
      </form>

      {/* Video Player */}
      <div className="video-player">
        <useGestureResponder onDoubleTap={handleDoubleTap}>
          <video ref={videoRef} controls>
            {file && <source src={URL.createObjectURL(file)} type="video/mp4" />}
            Your browser does not support the video tag.
          </video>
        </useGestureResponder>
      </div>

      {/* Display shared content here */}
      <div className="shared-content">
        <h3>Shared Content</h3>
        <ul>
          {sharedContent.map((item) => (
            <li key={item.id}>
              <p>{item.content}</p>
              {/* Display additional content details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublicSpace;

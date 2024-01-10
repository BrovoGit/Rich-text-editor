//compose.jsx
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Compose = () => {
  const locationState = useLocation().state;
  const [value, setValue] = useState(locationState?.desc || "");
  const [title, setTitle] = useState(locationState?.title || "");
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");
  const [video, setVideo] = useState("");
  const [cat, setCat] = useState(locationState?.cat || "");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      if (!file) {
        return ""; // Handle the case where file is not selected
      }

      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/upload", formData);
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Rethrow the error for the calling function to handle
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imgUrl = await upload();

      const postData = {
        title,
        desc: value,
        cat,
        img: file ? imgUrl : "",
        code,
        video,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };

      if (locationState) {
        await axios.put(`/posts/${locationState.id}`, postData);
      } else {
        await axios.post(`/posts/`, postData);
      }

      navigate("/");
    } catch (error) {
      console.error("Error posting data:", error);
      // Handle errors or provide user feedback as needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <textarea
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Paste video URL here..."
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />
        <div>
          <button onClick={() => console.log("Post Code")}>Post Code</button>
          <button onClick={() => console.log("Post Video")}>Post Video</button>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button>Update</button>
            <button onClick={handleClick} disabled={loading}>
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
        <div className="item">
        <h1>Category</h1>
                    <div className="cat">
                        <input
                        type="radio"
                        checked={cat === "art"}
                        name="cat"
                        value="art"
                        id="art"
                        onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input
                        type="radio"
                        checked={cat === "Codes"}
                        name="cat"
                        value="Codes"
                        id="movies"
                        onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="Codes">Codes</label>
                    </div>
                    <div className="cat">
                        <input
                        type="radio"
                        checked={cat === "Content"}
                        name="cat"
                        value="Content"
                        id="Content"
                        onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="Content">Content</label>
                    </div>
                    <div className="cat">
                        <input
                        type="radio"
                        checked={cat === "tech"}
                        name="cat"
                        value="tech"
                        id="tech"
                        onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="tech">Technology</label>
                    </div>
                    <div className="cat">
                        <input
                        type="radio"
                        checked={cat === "edu"}
                        name="cat"
                        value="edu"
                        id="edu"
                        onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="edu">Education</label>
                    </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;

//Footer.jsx
import React from "react"
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

const Footer = () => {
    return (
        <footer>
            <img src={logo} alt="Blog"/>
            <span>
                Website with React.js.<br/>
            </span>
        </footer>
    );   
};

export default Footer
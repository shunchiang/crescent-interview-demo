import React from "react";
import "../Styles/navbar.scss";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

export default function Navbar({ toggleEdit, editMode }) {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="crescendo recipes logo" />
        </Link>
      </div>
      <div className="links-container">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.crescendocollective.com/what-we-do"
        >
          About
        </a>
        <button
          className={editMode ? "exit-edit" : "edit-btn"}
          onClick={toggleEdit}
        >
          {editMode ? "Exit Edit" : "Edit Mode"}
        </button>
      </div>
    </div>
  );
}

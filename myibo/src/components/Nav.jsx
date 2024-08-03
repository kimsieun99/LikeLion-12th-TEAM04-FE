import React from "react";
import "../styles/Nav.css";
import profileIcon from "../img/profile.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link to="/">내이보로고</Link>
      </div>
      <form className="search-container">
        <input type="text" placeholder="치료명 입력" className="search-input" />
        <button type="submit" className="search-button">
          검색
        </button>
      </form>
      <div className="profile">
        <Link to="/my-insurance">
          <img src={profileIcon} alt="User Icon" className="profile-image" />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;

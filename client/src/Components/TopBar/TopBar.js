import React, { useContext } from "react";
import "./TopBar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import {
  FaFacebookSquare,
  FaTwitter,
  FaPinterest,
  FaInstagramSquare,
  FaSearch,
} from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import axios from "axios";
function TopBar() {
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);

  const handleLogout = async () => {
    try {
      await axios.delete("/auth/logout");
      dispatch({ type: "LOGOUT" });
    } catch (err) {}
  };
  return (
    <div className="top">
      <div className="topLeft">
        <FaFacebookSquare className="topIcon" />
        <FaTwitter className="topIcon" />
        <FaPinterest className="topIcon" />
        <FaInstagramSquare className="topIcon" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              About
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "Logout"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/setting">
            {user.profilePic ? (
              <img className="topImage" src={PF + user.profilePic} alt="" />
            ) : (
              <IoMdContact className="topImage" />
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
        <FaSearch className="topSearch" />
      </div>
    </div>
  );
}

export default TopBar;

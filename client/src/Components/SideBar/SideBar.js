import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SideBar.css";
import {
  FaFacebookSquare,
  FaTwitter,
  FaPinterest,
  FaInstagramSquare,
} from "react-icons/fa";
function SideBar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const response = await axios.get("/categorys");
      setCats(response.data);
    };
    getCats();
  }, []);
  return (
    <div className="SideBar">
      <div className="sideBarItem">
        <span className="sideBarTitle">ABOUT ME</span>
        <img
          src="https://stackideas.cachefly.net/images/apps/2429/logo.png"
          alt="imgg"
        />
        <p>
          Hey! This application will make you life ease by helping you create
          update and delete post with few simple step.
        </p>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">CATEGORIES</span>
        <ul className="sideBarList">
          {cats.map((cat) => {
            return (
              <Link className="link" to={`/?cat=${cat.name}`}>
                <li key={cat._id} className="sideBarListItem">
                  {cat.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">FOLLOW US</span>
        <div className="sideBarSocial">
          <FaFacebookSquare className="sideBarIcon" />
          <FaTwitter className="sideBarIcon" />
          <FaPinterest className="sideBarIcon" />
          <FaInstagramSquare className="sideBarIcon" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;

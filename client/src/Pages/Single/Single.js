import React from "react";
import "./Single.css";
import SideBar from "../../Components/SideBar/SideBar";
import SinglePost from "../../Components/SinglePost/SinglePost";
function Single() {
  return (
    <div className="single">
      <SinglePost />
      <SideBar />
    </div>
  );
}

export default Single;

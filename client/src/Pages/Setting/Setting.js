import React, { useContext, useState } from "react";
import "./Setting.css";
import { IoMdContact } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import SideBar from "../../Components/SideBar/SideBar";
import { Context } from "../../context/Context";
import axios from "axios";
function Setting() {
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err.message);
      }
    }
    try {
      const res = await axios.put(`/users/${user._id}`, updatedUser);
      dispatch({ type: "UPDATED_USER", payload: res.data });
      setSuccess(true);
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update your account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingFrom" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingPP">
            {user.profilePic || file ? (
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
                className="settingImg"
              />
            ) : (
              <IoMdContact className="settingImg" />
            )}
            <label htmlFor="fileInput">
              <FaRegEdit className="settingPPIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="settingSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: 20 }}
            >
              Profile has been updated
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}

export default Setting;

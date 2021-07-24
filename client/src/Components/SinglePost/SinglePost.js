import React, { useEffect, useState, useContext } from "react";
import "./SinglePost.css";
import { useLocation, Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { Context } from "../../context/Context";
function SinglePost() {
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        description: desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };
  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get("/posts/" + pathId);
      setPost(response.data);
      setTitle(response.data.title);
      setDesc(response.data.description);
    };
    getPost();
  }, [pathId]);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus="true"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div
                className="singlePostEdit"
                onClick={() => setUpdateMode(true)}
              >
                <FaRegEdit className="singlePostIcon" />
                <FaRegTrashAlt
                  className="singlePostIcon"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescriptionInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDescription">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostBtn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;

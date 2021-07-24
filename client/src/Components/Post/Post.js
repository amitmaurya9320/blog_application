import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="Post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCategorys">
          {post.category.map((c) => {
            return (
              <span key={c._id} className="postCategory">
                {c.name}
              </span>
            );
          })}
        </div>
        <Link className="link" to={`/post/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">{post.description}</p>
    </div>
  );
}

export default Post;

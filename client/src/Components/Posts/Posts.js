import React from "react";
import "./Posts.css";
import Post from "../Post/Post";
function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => {
        return <Post key={p._id} post={p} />;
      })}
    </div>
  );
}

export default Posts;

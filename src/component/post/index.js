import React, { useState } from "react";
import styles from "./post.module.css";

const Post = ({ postTitle, postContent, setClickedPostIndex, index }) => {
  return (
    <>
      <div
        className={styles.postContainer}
        onClick={() => {
            setClickedPostIndex(index);
        }}
      >
        <div>{postTitle}</div>
        <div>{postContent}</div>
      </div>
    </>
  );
};

export default Post;

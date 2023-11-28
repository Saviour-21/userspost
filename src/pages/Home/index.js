import React, { useEffect, useState } from "react";
import styles from "./home.module.css";


import UserPost from "../../component/userpost";
const Home = ({data, postData}) => {
  const getFilteredPosts = (id) => {
    const temp = postData.filter((item) => item.userId === id);
    return temp;
  }
  return (
    <div className={styles.wrapper}>
      {data.map((item, index) => (
        <div key={index}>
            <UserPost item={item} filteredPostData={getFilteredPosts(item.id)}/>
        </div>

      ))}
    </div>
  );
};

export default Home;

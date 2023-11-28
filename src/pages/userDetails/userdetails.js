import React, { useState } from "react";
import styles from "./userdetails.module.css";
import { useLocation } from "react-router-dom";
import Post from "../../component/post";
import UserDetailSection from "../../component/userdetailsection";
import Navbar from "../../component/navbar";
import Popup from "../../component/popup";

const UserDetails = () => {
    const {state: payload} = useLocation();
    const [clickedPostIndex, setClickedPostIndex] = useState(null);
    return (
      <>
       {clickedPostIndex !== null ? (<Popup popupClosed={setClickedPostIndex} clickedPostIndex={clickedPostIndex} data={payload.postData[clickedPostIndex]}/>) : null}
        <div className={styles.wrapper}>
            <Navbar />
        </div>
        <div className={styles.wrapper}>
            <UserDetailSection payload={payload}/>
        </div>
        <div className={styles.wrapper}>
        <div className={styles.postWrapper}>
          {payload.postData.map((item, index) => (
            <Post postTitle={item.title} postContent={item.body} key={index} setClickedPostIndex={setClickedPostIndex} index={index}/>
          ))}
        </div>
        </div>
      </>
    );
}

export default UserDetails;
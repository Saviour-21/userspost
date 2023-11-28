import React from "react";
import styles from "./usepost.module.css";
import { useNavigate } from "react-router-dom";

const UserPost = ({item, filteredPostData}) => {
    const navigate = useNavigate();
    const handleOnclick = (id) => {
        navigate(`/postdetails/${id}`, {
            state: {
                userData: item, 
                postData: filteredPostData,
            }
        });
    }
    return(
        <div className={styles.wrapper} onClick={() => handleOnclick(item.id)}>
            <div>
                Name: {item.name}
            </div>
            <div>
                Posts: {filteredPostData.length}
            </div>
        </div>
    )
}

export default UserPost;
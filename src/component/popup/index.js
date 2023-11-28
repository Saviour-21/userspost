import React, { useEffect } from "react";
import styles from "./popup.module.css";

const Popup = ({data, popupClosed, clickedPostIndex }) => {
    console.log("res", data);
    const handlePopupBackClick = (event) => {
        event.stopPropagation();
        popupClosed(null);
    }
    useEffect(()=>{
        if(clickedPostIndex !== null){
            document.querySelector("body").style.overflow = "hidden";
        }
        return(()=>{
         document.querySelector("body").style.overflow = "auto";
   
        })
    },[])
    return(
        <div className={styles.background} onClick={(event) => {handlePopupBackClick(event)}}>
            <div className={styles.popupBackground}>
                <h2>{data.title}</h2>
                <h4>{data.body}</h4>
            </div>

        </div>
    )
}

export default Popup;
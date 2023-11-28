import React from "react";
import styles from "./userdetailsection.module.css";

const UserDetailSection = ({payload}) => {

    return (
      <>
        <h2 className={styles.title}>Profile Page</h2>
        <div className={styles.detailsWrapper}>
          <div className={styles.nameWrapper}>
            <span>{payload.userData.name}</span>
            <span>
              {payload.userData.username} | {payload.userData.company.catchPhrase}
            </span>
          </div>
          <div className={styles.personalDetailsWrapper}>
            <span>
              {payload.userData.address.suit} {payload.userData.address.street}{" "}
              {payload.userData.address.city}
              {payload.userData.address.zipcode}
            </span>
            <span>
              {payload.userData.email} | {payload.userData.phone}
            </span>
          </div>
        </div>
      </>
    );
}

export default UserDetailSection;
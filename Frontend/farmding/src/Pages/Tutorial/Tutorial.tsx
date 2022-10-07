import { env } from "process";
import React, { useEffect, useState } from "react";
// import MetaMaskOnboarding from "@metamask/onboarding";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CustomBtn from "../../Common/UI/CustomBtn/CustomBtn";
import styles from "./Tutorial.module.scss";
// import "./Tutorial.css";

//// component
const Tutorial = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img
          src={process.env.PUBLIC_URL + "/Assets/tutorial_header1.png"}
          className={styles.headerImage}
        />
      </div>
      <div className={styles.header}>
        <img
          src={process.env.PUBLIC_URL + "/Assets/tutorial11.png"}
          className={styles.image}
        />
      </div>
      <div className={styles.header}>
        <img
          src={process.env.PUBLIC_URL + "/Assets/tutorial22.png"}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Tutorial;

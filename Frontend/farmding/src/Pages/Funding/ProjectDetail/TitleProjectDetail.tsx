import { useState } from "react";
import styles from "./TitleProjectDetail.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


interface TitleProjectDetailProps {
  // imgArray: string[];
  mainImg: string;
  title: string;
  farm: string;
  likeCnt: number;
  // eachFunding: eachFunding;
}

const TitleProjectDetail = ({ mainImg, title, farm, likeCnt }: TitleProjectDetailProps) => {

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.project_detail_banner}>
          <img src={`Assets/${mainImg}`} alt="" />
        </div>

        <div className={styles.project_detail_banner_txt}>
          <h1>{title}</h1>
          <div className={styles.farm_like}>
            <h4>{farm}</h4>
            <div className={styles.heart_area}>
              <FavoriteBorderIcon sx={{ color: "green" }} fontSize="large" />
              <div className={styles.like}>{likeCnt}</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TitleProjectDetail;

import { useState } from "react";
import styles from "./TitleProjectDetail.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { mainGreen } from "../../../Common/data/Style";

interface TitleProjectDetailProps {
  // imgArray: string[];
  projtId: number;
  title: string;
  farm: string;
  likeCnt: number;
  // eachFunding: eachFunding;
}

const TitleProjectDetail = ({
  projtId,
  title,
  farm,
  likeCnt,
}: TitleProjectDetailProps) => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.project_detail_banner}>
          <img src={`/Assets/funding/${projtId}.jpg`} alt="" />
        </div>

        <div className={styles.project_detail_banner_txt}>
          <h1>{title} </h1>
          <div className={styles.farm_like}>
            <h4>{farm}</h4>
            <div className={styles.heart_area}>
              <FavoriteBorderIcon sx={{ color: mainGreen }} fontSize="large" />
              <div className={styles.like}>{likeCnt}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleProjectDetail;

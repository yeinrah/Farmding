import { useState } from "react";
import styles from "./InfoProjectDetail.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CustomCarousel from "../../../Common/UI/Carousel/CustomCarousel";
import { Typography } from "@mui/material";

interface InfoProjectDetailProps {
  projtId: number;
  imgArray: string[];
  farm: string;
  projectInfo: string;
}

const InfoProjectDetail = ({
  projtId,
  imgArray,
  farm,
  projectInfo,
}: InfoProjectDetailProps) => {
  const carouselImgArray = [projtId.toString(), ...imgArray];
  return (
    <>
      <CustomCarousel imgArray={carouselImgArray} />
      <div className={styles.farm_expl}>
        <div className={styles.farm_name}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            {farm}
          </Typography>
          <Typography variant="h6" gutterBottom color="text.secondary">
            의 이야기
          </Typography>
        </div>
        <div className={styles.farm_info}>
          <Typography variant="subtitle1" gutterBottom>
            {projectInfo}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default InfoProjectDetail;

import { useState } from "react";
import styles from "./InfoProjectDetail.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CustomCarousel from "../../../Common/UI/Carousel/CustomCarousel";


interface InfoProjectDetailProps {
  imgArray: string[];
  farm: string;
  projectInfo: string;
}

const InfoProjectDetail = ({ imgArray, farm, projectInfo }: InfoProjectDetailProps) => {

  return (
    <>
      <CustomCarousel imgArray={imgArray} />
    </>
  );
};

export default InfoProjectDetail;

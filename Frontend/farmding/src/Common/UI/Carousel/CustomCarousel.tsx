import { useState } from "react";
import styles from "./CustomCarousel.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Carousel from "react-material-ui-carousel";

interface CustomCarouselProps {
  imgArray: string[];
}

const CustomCarousel = ({ imgArray }: CustomCarouselProps) => {
  return (
    <div className={styles.container}>
      <Carousel height="280px" sx={{ width: "500px" }}>
        {imgArray.map((img, i) => (
          <img
            key={i}
            src={`/Assets/funding/${img}.jpg`}
            className={styles.crs_img}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;

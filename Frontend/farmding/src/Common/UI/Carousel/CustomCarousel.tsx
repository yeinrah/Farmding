import { useState } from "react";
import styles from "./CustomCarousel.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Carousel from 'react-material-ui-carousel'

interface CustomCarouselProps {
  imgArray: string[];
}

const CustomCarousel = ({ imgArray }: CustomCarouselProps) => {

  return (
    <div className={styles.container}>
      <Carousel
        height= "200px"
        sx={{ width: "400px"}}
      >
        {
          imgArray.map( (img, i) => 
          <img key={i} src={`Assets/${img}`} 
            className={styles.crs_img}
          /> 
          )
        }
      </Carousel>


    </div>
  );
};

export default CustomCarousel;

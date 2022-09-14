import { useState } from "react";
import styles from "./FundingProjectDetail.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CustomCarousel from "../../../Common/UI/Carousel/CustomCarousel";
import { Button, Typography } from "@mui/material";


interface FundingProjectDetailProps {
  fundingAmount: number;
  targetAmount: number;
  funders: number;
  remainingDays: number;
}

const FundingProjectDetail = ({ fundingAmount, targetAmount, funders, remainingDays }: FundingProjectDetailProps) => {
  
  const fundingAchieveRate = parseFloat((fundingAmount / targetAmount).toFixed(2));
  return (
    <>
      <div className={styles.funding_amount}>
        <Typography variant="h2" gutterBottom fontWeight='bold' color="#5DAE8B"> 
          {fundingAmount}
        </Typography>
        <Typography variant="h2" gutterBottom fontWeight='bold'
          sx={{ ml: 2}}
        >
          SSF
        </Typography>
        <Typography variant="h5" gutterBottom color="text.secondary"
          sx={{ ml: 2, mt:3 }}
        >
          펀딩 중
        </Typography>
      </div>
      <div className={styles.funding_amount}>
        <Typography variant="h3" gutterBottom fontWeight='bold'> 
          {fundingAchieveRate*100}%
        </Typography>
        <Typography variant="h5" gutterBottom color="text.secondary"
          sx={{ ml: 2, mt:2 }}
        >
          달성
        </Typography>
      </div>
      <div className={styles.funding_funders}>
        <Typography variant="h4" gutterBottom fontWeight='bold'
          sx={{ ml: 1 }}
        > 
          {funders}명
        </Typography>
        <Typography variant="h6" gutterBottom color="text.secondary"
          sx={{ ml: 1, mt:1 }}
        >
          참여
        </Typography>
      </div>
      <div className={styles.funding_amount}>
        <Typography variant="h2" gutterBottom fontWeight='bold'
          sx={{ mr: 2}}
        >
          D -
        </Typography>
        <Typography variant="h2" gutterBottom fontWeight='bold' color="#FF7676"> 
          {remainingDays}
        </Typography>
      </div>
      <Button variant="contained"
        sx={{bgcolor:"#5DAE8B", width:"350px", height:"45px", 
        fontSize:"20px", fontWeight:"bold",
  
        }}  
      >펀딩하기</Button>
      
    </>
  );
};

export default FundingProjectDetail;

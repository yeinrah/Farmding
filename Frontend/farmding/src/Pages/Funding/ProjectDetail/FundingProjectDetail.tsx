import { useState } from "react";
import styles from "./FundingProjectDetail.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CustomCarousel from "../../../Common/UI/Carousel/CustomCarousel";
import { Typography } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { mainGreen, mainPink } from "../../../Common/data/Style";


interface FundingProjectDetailProps {
  fundingAmount: number;
  targetAmount: number;
  funders: number;
  remainingDays: number;
}
const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(mainGreen),
  backgroundColor: mainGreen,
  border: "3px solid #CAD6E2",
  '&:hover': {
    backgroundColor: "#3C7B60",
  },
}));
const FundingProjectDetail = ({ fundingAmount, targetAmount, funders, remainingDays }: FundingProjectDetailProps) => {
  
  const fundingAchieveRate = parseFloat((fundingAmount / targetAmount).toFixed(2));
  return (
    <>
      <div className={styles.funding_amount}>
        <Typography variant="h2" gutterBottom fontWeight='bold' color={mainGreen}> 
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
        <Typography variant="h2" gutterBottom fontWeight='bold' color={mainPink}> 
          {remainingDays}
        </Typography>
      </div>
      {/* <Button variant="contained" 
        sx={{bgcolor: mainGreen, width:"350px", height:"45px", 
        fontSize:"20px", fontWeight:"bold",
  
        }}  
      >펀딩하기</Button> */}
      <div className={styles.btn}>
        <CustomButton variant="contained" 
          sx={{width:"400px", height:"70px", 
          fontSize:"30px", fontWeight:"bold", color: "white",
          borderRadius:"15px", letterSpacing: 3
          }}  
        >펀딩하기</CustomButton>
      </div>
      
    </>
  );
};

export default FundingProjectDetail;

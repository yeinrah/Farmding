import { useState } from "react";
import CustomBtn from "../../../Common/UI/CustomBtn/CustomBtn";
import { mainGreen, mainPink } from "../../../Common/data/Style";
// scss
import styles from "./FundingProjectDetail.module.scss";
// mui
import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import ChooseReward from "../Reward/ChooseReward";

interface FundingProjectDetailProps {
  projtId: number;
  fundingAmount: number;
  targetAmount: number;
  funders: number;
  remainingDays: number;
  title: string;
}

const FundingProjectDetail = ({
  projtId,
  fundingAmount,
  targetAmount,
  funders,
  remainingDays,
  title,
}: FundingProjectDetailProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fundingAchieveRate = parseFloat(
    (fundingAmount / targetAmount).toFixed(2)
  );
  const chooseRewardModalHandler = () => {
    handleOpen();
  };

  return (
    <>
      <div className={styles.funding_amount}>
        <Typography
          variant="h2"
          gutterBottom
          fontWeight="bold"
          color={mainGreen}
        >
          {fundingAmount}
        </Typography>
        <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ ml: 2 }}>
          SSF
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          color="text.secondary"
          sx={{ ml: 2, mt: 3 }}
        >
          펀딩 중
        </Typography>
      </div>
      <div className={styles.funding_amount}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          {fundingAchieveRate * 100}%
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          color="text.secondary"
          sx={{ ml: 2, mt: 2 }}
        >
          달성
        </Typography>
      </div>
      <div className={styles.funding_funders}>
        <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ ml: 1 }}>
          {funders}명
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          color="text.secondary"
          sx={{ ml: 1, mt: 1 }}
        >
          참여
        </Typography>
      </div>
      <div className={styles.funding_amount}>
        <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ mr: 2 }}>
          D -
        </Typography>
        <Typography
          variant="h2"
          gutterBottom
          fontWeight="bold"
          color={mainPink}
        >
          {remainingDays}
        </Typography>
      </div>
      <div className={styles.btn}>
        <CustomBtn
          customSx={{
            width: "400px",
            height: "70px",
            fontSize: "30px",
            letterSpacing: 3,
          }}
          onclick={chooseRewardModalHandler}
          btnWord={"펀딩하기"}
        />
        {/* <CustomButton variant="contained"
          onClick={chooseRewardModalHandler}
          sx={{width:"400px", height:"70px", 
          fontSize:"30px", fontWeight:"bold", color: "white",
          borderRadius:"15px", letterSpacing: 3
          }}  
        >펀딩하기</CustomButton> */}
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <ChooseReward title={title} pjtId={projtId} />
      </Modal>
    </>
  );
};

export default FundingProjectDetail;

import { useEffect, useState } from "react";
import Web3 from "web3";

import { useNavigate } from "react-router-dom";
import EachRewardItem from "./EachRewardItem";

// scss
import styles from "./FundingComplete.module.scss";

//mui

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// data
import { mainGreen, modalStyle } from "../../../Common/data/Style";
import { cutLongTitle } from "../../../Common/functions/CutLongTitle";

import CustomBtn from "../../../Common/UI/CustomBtn/CustomBtn";

import { getBalance } from "../../../utils/Tokens";
import { useRecoilState } from "recoil";
import {
  isAccountChangedState,
  userNameState,
} from "../../../Recoil/atoms/account";
import { fundingHandler } from "../../../utils/fundingProject";
import {
  addUserRewardQuantityInfo,
  fetchRewardDetail,
  updateRewardResidual,
} from "../../../Common/API/fundingAPI";
import { loginState } from "../../../Recoil/atoms/auth";
import { getMyInfo } from "../../../Common/API/userApi";
import DisabledBtn from "../../../Common/UI/CustomBtn/DisabledBtn";

export interface IFundingCompleteProps {
  title: string;
  price: number;
  unit: string;
  shippingFee: number;
  expectedDate: string;
  selectedQuantity: number;
}

const FundingComplete = ({
  title,
  price,
  unit,
  shippingFee,
  expectedDate,
  selectedQuantity,
}: IFundingCompleteProps) => {
  // const { ethereum } = window;
  const [currentUserName, setCurrentUserName] =
    useRecoilState<string>(userNameState);

  const fundingAmount = price * selectedQuantity + shippingFee;

  const getNFTHandler = () => {};

  return (
    <div>
      <Typography
        id="modal-title"
        variant="h4"
        component="h2"
        fontWeight="bold"
        // sx={{ mb: 3 }}
      >
        펀딩이 완료되었습니다.
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        fontWeight="700"
        // sx={{ mb: 3 }}
      >
        {currentUserName}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        color="text.secondary"
        // sx={{ mb: 3 }}
      >
        님의 펀딩 내역은 다음과 같습니다.
      </Typography>

      <div className={styles.reward_confirm_box}>
        <div className={styles.funding_price}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            총 펀딩금액:
          </Typography>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            {fundingAmount}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            // fontWeight="bold"
            sx={{ ml: 2, mt: 1 }}
          >
            SSF
          </Typography>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            (배송비 포함)
          </Typography>
        </div>
        <div className={styles.title}>
          <Typography variant="h6" gutterBottom fontWeight="800" sx={{ ml: 4 }}>
            {`${title} ${unit}`}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            fontWeight="400"
            sx={{ ml: 4 }}
          >
            수량: {selectedQuantity} 개
          </Typography>
        </div>
        <div className={styles.shipping}>
          <Typography
            variant="subtitle1"
            gutterBottom
            fontWeight="400"
            sx={{ color: "#868686", mb: 0 }}
          >
            배송비 : <span>{shippingFee}</span> SSF
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            fontWeight="400"
            sx={{ color: "#868686" }}
          >
            배송예정일: <span>{expectedDate}</span> 예정
          </Typography>
        </div>
      </div>
      <div className={styles.btn}>
        <CustomBtn
          customSx={{
            width: "200px",
            height: "50px",
            fontSize: "20px",
            letterSpacing: 3,
          }}
          onclick={getNFTHandler}
          btnWord={"NFT 받기"}
        />
      </div>
    </div>
  );
};
export default FundingComplete;

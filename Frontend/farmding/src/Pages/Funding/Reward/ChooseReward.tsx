import { useEffect, useState } from "react";
import Web3 from "web3";

import { useNavigate } from "react-router-dom";
import EachRewardItem from "./EachRewardItem";

// scss
import styles from "./ChooseReward.module.scss";

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
import FundingComplete from "./FundingComplete";

export interface IChooseRewardProps {
  pjtId: number;
  title: string;
}

const ChooseReward = ({ title, pjtId }: IChooseRewardProps) => {
  const { ethereum } = window;
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [currentUserName, setCurrentUserName] =
    useRecoilState<string>(userNameState);
  const [balance, setBalance] = useState("");
  const [isRewardClicked, setIsRewardClicked] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [currentUserInfo, setCurrentUserInfo] = useState({
    userId: 0,
  });
  const [isFunded, setIsFunded] = useState(false);
  const [reward, setReward] = useState({
    rewardId: 0,
    ssfPrice: 0,
    rewardName: "",
    amount: 0,
    deliveryFee: 0,
    deliveryDate: "",
  });
  const [isAccountChanged, SetIsAccountChanged] = useRecoilState<boolean>(
    isAccountChangedState
  );
  ethereum.on("accountsChanged", (accounts: any) => {
    setIsLogin(false);
    // SetIsAccountChanged(true);
  });
  const navigate = useNavigate();
  // const [account, setAccount] = useRecoilState<string>(AccountState);
  // const [chooseReward, setChooseReward] = useState([]);
  // 잔고랑 계좌, 계좌 변경 상태 전역 상태관리 하기! recoil로!!!!!!!

  let fundingAmount: number;

  const getAmountHandler = (amount: number) => {
    setSelectedQuantity(amount);
    fundingAmount = amount * reward.ssfPrice;
  };
  const getClickOrNotHandler = (clickOrNot: boolean) => {
    setIsRewardClicked(clickOrNot);
  };

  const onFundingClick = async () => {
    const fundedOrNot: boolean = await fundingHandler(
      pjtId,
      fundingAmount,
      rewardDetail.shippingFee
    );
    setIsFunded(fundedOrNot);

    await updateRewardResidual(rewardDetail.rewardId, selectedQuantity);
    await addUserRewardQuantityInfo(
      currentUserInfo.userId,
      pjtId,
      rewardDetail.rewardId,
      selectedQuantity
    );
  };

  const rewardDetail = {
    rewardId: reward.rewardId,
    price: reward.ssfPrice,
    unit: reward.rewardName,
    residual: reward.amount,
    shippingFee: reward.deliveryFee,
    expectedDate: reward.deliveryDate.substr(0, 10),
  };

  useEffect(() => {
    (async function () {
      const currentBalance: any = await getBalance(ethereum.selectedAddress);
      setBalance(currentBalance);
      const rwrdDetail: any = await fetchRewardDetail(pjtId);
      setReward(rwrdDetail);
      const userInfo = await getMyInfo(ethereum.selectedAddress);
      console.log(userInfo.data.user, "유저 정보!!!!!!!!!!!!");
      setCurrentUserInfo(userInfo.data.user);
      setCurrentUserName(userInfo.data.user.nickname);
      SetIsAccountChanged(false);
    })();
  }, [isAccountChanged]);

  return (
    <Box sx={{ ...modalStyle, width: 500, height: 530 }}>
      {isFunded ? (
        <FundingComplete
          title={cutLongTitle(title, 12)}
          price={rewardDetail.price}
          unit={rewardDetail.unit}
          shippingFee={rewardDetail.shippingFee}
          expectedDate={rewardDetail.expectedDate}
          selectedQuantity={selectedQuantity}
        />
      ) : (
        <>
          <Typography
            id="modal-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
            color={mainGreen}
            sx={{ mb: 3 }}
          >
            리워드 선택
          </Typography>
          <div className={styles.reward_item}>
            <EachRewardItem
              title={cutLongTitle(title, 12)}
              price={rewardDetail.price}
              unit={rewardDetail.unit}
              residual={rewardDetail.residual}
              shippingFee={rewardDetail.shippingFee}
              expectedDate={rewardDetail.expectedDate}
              getAmount={getAmountHandler}
              onClickOrNot={getClickOrNotHandler}
            />
          </div>
          <div className={styles.btn}>
            {isRewardClicked ? (
              <CustomBtn
                customSx={{
                  width: "200px",
                  height: "50px",
                  fontSize: "20px",
                  letterSpacing: 3,
                }}
                onclick={onFundingClick}
                // btnWord={"다음 단계로"}
                btnWord={"펀딩하기"}
              />
            ) : (
              <DisabledBtn
                customSx={{
                  width: "200px",
                  height: "50px",
                  fontSize: "20px",
                  letterSpacing: 3,
                }}
                btnWord={"펀딩하기"}
              />
            )}
          </div>
        </>
      )}
    </Box>
  );
};
export default ChooseReward;

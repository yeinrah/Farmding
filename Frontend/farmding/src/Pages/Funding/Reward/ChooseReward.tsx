import { useEffect, useState } from "react";
import EachRewardItem from "./EachRewardItem";

// scss
import styles from "./ChooseReward.module.scss";

//mui

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// data
import { mainGreen, modalStyle } from "../../../Common/data/Style";
import { cutLongTitle } from "../../../Common/functions/CutLongTitle";

import CustomBtn from "../../../Common/UI/CustomBtn/CustomBtn";

import { getBalance } from "../../../utils/Tokens";
import { useRecoilState } from "recoil";
import {
  isAccountChangedState,
  currentUserNameState,
  currentUserIdState,
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
import { registerNFT } from "../../../Common/API/NFTApi";
import { nftContract } from "../../../Common/ABI/abi";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Common/UI/Spinner/Spinner";
import Swal from "sweetalert2";

export interface IChooseRewardProps {
  pjtId: number;
  title: string;
  farmer: string;
}

const ChooseReward = ({ title, pjtId, farmer }: IChooseRewardProps) => {
  const { ethereum } = window;
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] =
    useRecoilState<number>(currentUserIdState);
  const [isAccountChanged, SetIsAccountChanged] = useRecoilState<boolean>(
    isAccountChangedState
  );
  const [currentUserName, setCurrentUserName] =
    useRecoilState<string>(currentUserNameState);
  const [balance, setBalance] = useState("");
  const [isRewardClicked, setIsRewardClicked] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [isFunded, setIsFunded] = useState(false);
  const [reward, setReward] = useState({
    rewardId: 0,
    ssfPrice: 0,
    rewardName: "",
    amount: 0,
    deliveryFee: 0,
    deliveryDate: "",
  });
  ethereum.on("accountsChanged", (accounts: any) => {
    setIsLogin(false);
    // SetIsAccountChanged(true);
  });
  // const [account, setAccount] = useRecoilState<string>(AccountState);
  // const [chooseReward, setChooseReward] = useState([]);
  // ????????? ??????, ?????? ?????? ?????? ?????? ???????????? ??????! recoil???!!!!!!!

  let fundingAmount: number;

  const getAmountHandler = (amount: number) => {
    setSelectedQuantity(amount);
    fundingAmount = amount * reward.ssfPrice;
  };
  const getClickOrNotHandler = (clickOrNot: boolean) => {
    setIsRewardClicked(clickOrNot);
  };
  const getNFTHandler = async () => {
    setIsLoading(true);
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      //0????????? ???????????? +1
      const minting = await nftContract.methods
        .mint(accounts[0], 1)
        .send({ from: accounts[0] });
      const cnt = await nftContract.methods.getCount().call();
      console.log(cnt);
      const nowNickName = await (
        await getMyInfo(accounts[0])
      ).data.user.nickname;
      await registerNFT(
        // pjtId,
        1,
        minting.events.getNFTData.returnValues[0],
        nowNickName,
        accounts[0],
        Number(cnt)
      );
      Swal.fire({
        icon: "success",
        title: "?????? ??????",
      });
      navigate("/mypage");
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const onFundingClick = async () => {
    setIsLoading(true);
    const fundedOrNot: boolean = await fundingHandler(
      pjtId,
      fundingAmount,
      rewardDetail.shippingFee
    );
    setIsFunded(fundedOrNot);
    setIsLoading(false);

    await updateRewardResidual(rewardDetail.rewardId, selectedQuantity);
    await addUserRewardQuantityInfo(
      pjtId,
      currentUserId,
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

      SetIsAccountChanged(false);
    })();
  }, [isAccountChanged]);

  return (
    <Box sx={{ ...modalStyle, width: 500, height: 530 }}>
      {isLoading && <Spinner />}
      {isFunded ? (
        <>
          <div className={styles.complete_modal_title}>
            ????????? ?????????????????????.
          </div>
          <div className={styles.complete_modal_content}>
            <div>
              <span>{currentUserName}</span>
              ?????? ?????? ?????????
            </div>
            <div>????????? ????????????.</div>
          </div>
          <FundingComplete
            title={cutLongTitle(title, 12)}
            farmer={farmer}
            price={rewardDetail.price}
            unit={rewardDetail.unit}
            shippingFee={rewardDetail.shippingFee}
            expectedDate={rewardDetail.expectedDate}
            selectedQuantity={selectedQuantity}
          />
          <div className={styles.get_nft_btn}>
            <CustomBtn
              customSx={{
                width: "200px",
                height: "50px",
                fontSize: "20px",
                letterSpacing: 3,
              }}
              bgColor={"mainGreen"}
              onclick={getNFTHandler}
              btnWord={"NFT ??????"}
            />
          </div>
        </>
      ) : (
        <>
          <Typography
            id="modal-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
            color={mainGreen}
            sx={{ mb: 4 }}
          >
            ????????? ??????
          </Typography>
          <div className={styles.reward_item}>
            {!isRewardClicked && (
              <div className={styles.modal_content}>
                ?????? ???????????? ???????????? ????????? ??????????????????.
              </div>
            )}
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
                bgColor={"mainGreen"}
                onclick={onFundingClick}
                // btnWord={"?????? ?????????"}
                btnWord={"????????????"}
              />
            ) : (
              <DisabledBtn
                customSx={{
                  width: "200px",
                  height: "50px",
                  fontSize: "20px",
                  letterSpacing: 3,
                }}
                btnWord={"????????????"}
              />
            )}
          </div>
        </>
      )}
    </Box>
  );
};
export default ChooseReward;

import { useState, useEffect } from "react";
import CustomBtn from "../../../Common/UI/CustomBtn/CustomBtn";
import { mainGreen, mainPink } from "../../../Common/data/Style";
// scss
import styles from "./FundingProjectDetail.module.scss";
// mui
import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import ChooseReward from "../Reward/ChooseReward";
import { CrowdFundingContract } from "../../../Web3Config";
import { useRecoilState } from "recoil";
import { loginState } from "../../../Recoil/atoms/auth";
import { isAccountChangedState } from "../../../Recoil/atoms/account";

interface FundingProjectDetailProps {
  projtId: number;
  farmer: string;
  fundingAmount: number;
  targetAmount: number;
  funders: number;
  remainingDays: number;
  title: string;
  isClaimed: boolean;
}

const FundingProjectDetail = ({
  projtId,
  farmer,
  fundingAmount,
  targetAmount,
  funders,
  remainingDays,
  title,
  isClaimed,
}: FundingProjectDetailProps) => {
  const { ethereum } = window;
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [isAccountChanged, SetIsAccountChanged] = useRecoilState<boolean>(
    isAccountChangedState
  );
  const [nowFundedAmount, setNowFundedAmount] = useState(0);
  const [fundersCount, setFundersCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [isClaimClicked, setIsClaimClicked] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fundingAchieveRate = Math.round(
    parseFloat(
      // (nowFundedAmount / targetAmount).toFixed(2)
      (nowFundedAmount / targetAmount).toString()
    ) * 100
  );
  const chooseRewardModalHandler = () => {
    handleOpen();
  };

  useEffect(() => {
    (async function () {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (!accounts.length) {
        // console.log(accounts);
        setIsLogin(false);
        // navigate("/login");
        // return;
      }

      const fundedAmount = await CrowdFundingContract.methods
        .getNowFundedAmount(projtId)
        .call();
      setNowFundedAmount(fundedAmount);

      const fundersCnt = await CrowdFundingContract.methods
        .getNowFundersCnt(projtId)
        .call();
      setFundersCount(fundersCnt);

      // setCurrentAccount(accounts[0]);
      // console.log(accounts[0]);

      // const projtDetail: any = await fetchProjectDetail(Number(pjtId));
      // setPjtDetail(projtDetail);
      // SetIsAccountChanged(false);
      // SetIsLoading(false);
    })();
  }, [isAccountChanged]);

  // useEffect(() => {
  //   setIsClaimClicked(isClaimed);
  // }, [isClaimed]);

  return (
    <>
      {isClaimed ? (
        <div className={styles.funding_finish}>
          <Typography
            gutterBottom
            fontWeight="bold"
            sx={{
              fontSize: 50,
              // my: "auto",
              textAlign: "center",
            }}
          >
            해당 프로젝트는
            <br /> 펀딩 마감되었습니다.
          </Typography>
        </div>
      ) : (
        <>
          <div className={styles.funding_day}>
            <Typography
              gutterBottom
              fontWeight="bold"
              sx={{ mr: 2, fontSize: 80, mb: 0 }}
            >
              D -
            </Typography>
            <Typography
              gutterBottom
              fontWeight="bold"
              color={mainPink}
              sx={{ fontSize: 80, mb: 0 }}
            >
              {remainingDays}
            </Typography>
          </div>
          <div className={styles.funding_amount}>
            <Typography
              variant="h3"
              gutterBottom
              fontWeight="bold"
              // color={mainGreen}
            >
              {nowFundedAmount}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="text.secondary"
              sx={{ ml: 2, mt: 2 }}
            >
              SSF 펀딩
            </Typography>
          </div>
          <div className={styles.funding_amount}>
            <Typography variant="h3" gutterBottom fontWeight="bold">
              {fundingAchieveRate}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="text.secondary"
              sx={{ ml: 2, mt: 2 }}
            >
              % 달성
            </Typography>
          </div>
          <div className={styles.funding_funders}>
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              sx={{ ml: 1 }}
            >
              {fundersCount}명
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              color="text.secondary"
              sx={{ ml: 2, mt: 1 }}
            >
              참여
            </Typography>
          </div>
          <div className={styles.btn}>
            <CustomBtn
              customSx={{
                width: "350px",
                height: "70px",
                fontSize: "30px",
                letterSpacing: 3,
              }}
              bgColor={"mainGreen"}
              onclick={chooseRewardModalHandler}
              btnWord={"펀딩하기"}
            />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
          >
            <ChooseReward title={title} pjtId={projtId} farmer={farmer} />
          </Modal>
        </>
      )}
    </>
  );
};

export default FundingProjectDetail;

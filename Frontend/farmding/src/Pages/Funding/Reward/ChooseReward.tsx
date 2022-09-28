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
import { isAccountChangedState } from "../../../Recoil/atoms/account";
import { fundingHandler } from "../../../utils/fundingProject";

export interface IChooseRewardProps {
  pjtId: number;
  title: string;
}

const dummyShipping = {
  shippingFee: 10,
  expectedDate: "2022-09-21",
};
const dummyRewards = [
  {
    price: 350,
    unit: "6kg",
    residual: 90,
  },
  {
    price: 250,
    unit: "4kg",
    residual: 70,
  },
  {
    price: 150,
    unit: "2kg",
    residual: 80,
  },
  {
    price: 80,
    unit: "1kg",
    residual: 30,
  },
];

const ChooseReward = ({ title, pjtId }: IChooseRewardProps) => {
  const { ethereum } = window;
  const [isAccountChanged, SetIsAccountChanged] = useRecoilState<boolean>(
    isAccountChangedState
  );
  ethereum.on("accountsChanged", (accounts: any) => {
    SetIsAccountChanged(true);
  });
  const navigate = useNavigate();
  // const [account, setAccount] = useRecoilState<string>(AccountState);
  // const [chooseReward, setChooseReward] = useState([]);
  // 잔고랑 계좌, 계좌 변경 상태 전역 상태관리 하기! recoil로!!!!!!!
  const [balance, setBalance] = useState("");
  let fundingAddr: string;

  // const transactionParameters = {
  //   nonce: '0x00', // ignored by MetaMask
  //   gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
  //   gas: '0x2710', // customizable by user during MetaMask confirmation.
  //   to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  //   from: ethereum.selectedAddress, // must match user's active address.
  //   value: '0x00', // Only required to send ether to the recipient from the initiating external account.
  //   data:
  //     '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
  //   chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  // };

  // const getBuy = async () => {
  //   try {
  //     const accounts = await ethereum.request({ method: "eth_accounts" })
  //     if (!accounts) {
  //       alert("지갑을 연결해주세요")
  //       return
  //     }
  //     setIsLoading(true)
  //     // sale컨트랙트 주소 받아서 생성
  //     const response = await SaleFactoryContract.methods
  //     .getSaleContractAddress(localitem.tokenId)
  //     .call();
  //     const saleContract = await createSaleContract(response)

  //     // sale컨트랙트로 erc20토큰 전송권한 허용
  //     await SSFTokenContract.methods
  //     .approve(response, price)
  //     .send({ from: accounts[0] });

  //     //purchase 요청
  //     const response2 = await saleContract.methods.purchase(price).send({ from: accounts[0] });
  //     const winner = (response2.events.SaleEnded.returnValues.winner);
  //     const amount = (response2.events.SaleEnded.returnValues.amount);
  //     postgetBuy.mutate()
  //   } catch (error) {
  //     setIsLoading(false)
  //     return
  //   }
  // }

  useEffect(() => {
    (async function () {
      const currentBalance: any = await getBalance(ethereum.selectedAddress);
      setBalance(currentBalance);
      // setBalance(Number(currentBalance) / 10 ** 18);
      // const claimRes = await CrowdFundingContract.methods
      //   .claim(pjtId)
      //   .send({ from: accounts[0] });
      // console.log(claimRes);
      // const claimId = claimRes.events.Claim.returnValues.id;
    })();
  }, [isAccountChanged]);

  return (
    <Box sx={{ ...modalStyle, width: 500, height: 600 }}>
      <Typography
        id="modal-title"
        variant="h5"
        component="h2"
        fontWeight="bold"
        color={mainGreen}
        sx={{ mb: 3 }}
      >
        리워드를 선택해주세요
      </Typography>
      <div>
        {dummyRewards.map((rwd, idx) => (
          <EachRewardItem
            idx={idx}
            title={cutLongTitle(title, 12)}
            price={rwd.price}
            unit={rwd.unit}
            residual={rwd.residual}
            shippingFee={dummyShipping.shippingFee}
            expectedDate={dummyShipping.expectedDate}
          />
        ))}
      </div>

      <div className={styles.btn}>
        <CustomBtn
          customSx={{
            width: "200px",
            height: "50px",
            fontSize: "20px",
            letterSpacing: 3,
          }}
          onclick={() => fundingHandler(pjtId)}
          // btnWord={"다음 단계로"}
          btnWord={"펀딩하기"}
        />
      </div>
    </Box>
  );
};
export default ChooseReward;

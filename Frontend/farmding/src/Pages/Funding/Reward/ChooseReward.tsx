
import { useEffect, useState } from "react";
import Web3 from 'web3';

import { SSFTokenAddress } from "../../../Web3Config";
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
import { getBalance, tokenTransfer } from "../../../utils/Tokens";
import sendTransaction from "../../../utils/TxSender";

export interface IChooseRewardProps {
  title: string;
}


const dummyShipping = {
  shippingFee: 10,
  expectedDate: "2022-09-21"
}
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
  }
];


const ChooseReward = ({ title }: IChooseRewardProps) => {
  const { ethereum } = window;
  const navigate = useNavigate();
  // const [chooseReward, setChooseReward] = useState([]);
  // 잔고랑 계좌, 계좌 변경 상태 전역 상태관리 하기! recoil로!!!!!!!
  const [balance, setBalance] = useState('');
  const [account, setAccount] = useState('');
  const [isAccountChanged, setIsAcountChanged] = useState(false);

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
  

  const fundingHandler = async () => {
    // await getBalance(fromAddr)
    if (balance > "5" && account && balance) {
      const sendFunding = await sendTransaction(
        "0x2113D5636FF11747176A23E79989f1eBa7f3cA60",
        "3"
      )
      console.log(sendFunding)
      // const sendFunding = await tokenTransfer(
      //   account, 
      //   "dd9fd7fc0a608ad154c8fb7a542b1275e707a47772c1b9cf9793e476ea9738a0",
      //   "0x2113D5636FF11747176A23E79989f1eBa7f3cA60",
      //   3
      // )
      // console.log("거래 결과: ", sendFunding)
      // await ethereum.request({
      //   method: 'eth_sendTransaction',
      //   params: [transactionParameters],
      // });

  

    }

  }
  useEffect(() => {
    (async function () {
      setAccount(ethereum.selectedAddress)
      const currentBalance:any = await getBalance(ethereum.selectedAddress)
      setBalance(currentBalance)
      setIsAcountChanged(false)
      // setBalance(Number(currentBalance) / 10 ** 18);
    })();
	}, [isAccountChanged]);

  return (
    <Box sx={{...modalStyle, width: 500, height: 600 }}>
      <Typography id="modal-title" 
        variant="h5" component="h2"
        fontWeight= 'bold'
        color = {mainGreen}
        sx={{ mb: 3}}
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
        <CustomBtn customSx={{width:"200px", height:"50px", 
          fontSize:"20px", letterSpacing: 3}}
          onclick={fundingHandler}
          btnWord={'다음 단계로'}
        />

      </div>
      
    </Box>
  );
}
export default ChooseReward;
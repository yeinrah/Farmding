
import { useState } from "react";
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
  // const [chooseReward, setChooseReward] = useState([]);
  const navigate = useNavigate();
  const showMetamaskHandler = () => {

  }

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
          onclick={showMetamaskHandler}
          btnWord={'다음 단계로'}
        />

      </div>
      
    </Box>
  );
}
export default ChooseReward;
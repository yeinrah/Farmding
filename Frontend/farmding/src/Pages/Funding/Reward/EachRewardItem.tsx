import { Typography } from "@mui/material";
import { useState } from "react";
import CustomSelect from "../../../Common/UI/Select/CustomSelect";
import styles from "./EachRewardItem.module.scss";


export interface IEachRewardItemProps {
  idx: number;
  title: string;
  price: number;
  unit: string;
  residual: number;
  shippingFee: number;
  expectedDate: string;
}

const EachRewardItem = ({ idx, title, price, unit, residual, shippingFee, expectedDate }: IEachRewardItemProps) => {
  const [selectedReward, setSelectedReward] = useState<null | number>(null);
  const [isClicked, setIsClicked] = useState(false);

  const chooseRewardHandler = () => {
    setIsClicked(!isClicked)
    // if (!isClicked) {
    //   setIsClicked(true)
    //   // 선택된 reward idx 저장하기.
    // } else {
    //   setIsClicked(false)
      
    // }

  }

  return (
    <>
      <div
        className={`${styles.reward_box} ${isClicked === true? `${styles.active}` : ''}`}  
        onClick={chooseRewardHandler}>
        <div className={styles.funding_price}>
          <Typography variant="h4" gutterBottom color="text.secondary" fontWeight='bold'> 
            {price}
          </Typography>
          <Typography variant="h6" gutterBottom fontWeight='bold'
            sx={{ ml: 2, mt:1}}
          >
            SSF
          </Typography>
          <Typography variant="h6" gutterBottom color="text.secondary"
            sx={{ ml: 2, mt:1 }}
          >
            펀딩
          </Typography>
        </div>
        <div className={styles.title}>
          <Typography variant="h6" gutterBottom fontWeight= "800"
            sx={{ ml: 4 }}
          > 
            {`${title} ${unit}`}
          </Typography>
          <Typography variant="subtitle1" gutterBottom 
            sx={{ ml: 4 }}
          > 
            (<span>{residual}</span> 개 남음)
          </Typography>
        </div>
        <div className={styles.shipping}>
          <Typography variant="subtitle1" gutterBottom fontWeight= "400"
            sx={{ color: "#868686", mb:0 }}
          > 
            배송비 : <span>{shippingFee}</span> SSF
          </Typography>
          <Typography variant="subtitle1" gutterBottom fontWeight= "400"
            sx={{ color: "#868686", }}
          > 
            배송예정일: <span>{expectedDate}</span> 예정
          </Typography>
        </div>
      </div>
      {isClicked && 
        <div className={styles.select}>
          <CustomSelect endNumber={10} />
        </div>} 

    </>
  );
};
export default EachRewardItem;

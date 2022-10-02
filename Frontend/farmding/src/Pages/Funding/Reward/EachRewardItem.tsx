import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomSelect from "../../../Common/UI/Select/CustomSelect";
import styles from "./EachRewardItem.module.scss";

export interface IEachRewardItemProps {
  title: string;
  price: number;
  unit: string;
  residual: number;
  shippingFee: number;
  expectedDate: string;
  getAmount: (selectAmount: number) => void;
  onClickOrNot: (clickOrNot: boolean) => void;
}

const EachRewardItem = ({
  title,
  price,
  unit,
  residual,
  shippingFee,
  expectedDate,
  getAmount = () => {},
  onClickOrNot = () => {},
}: IEachRewardItemProps) => {
  const [selectedReward, setSelectedReward] = useState<null | number>(null);
  const [isClicked, setIsClicked] = useState(false);

  const chooseRewardHandler = () => {
    onClickOrNot(!isClicked);
    setIsClicked(!isClicked);
    // if (!isClicked) {
    //   setIsClicked(true)
    //   // 선택된 reward idx 저장하기.
    // } else {
    //   setIsClicked(false)

    // }
  };
  const selectChangeHandler = (selectedAmount: number) => {
    // const nowFunded = selectedAmount * price;
    // console.log("얼마 할건지!!! 배송비빼고", nowFunded);
    getAmount(selectedAmount);
  };

  return (
    <>
      <div
        className={`${styles.reward_box} ${
          isClicked === true ? `${styles.active}` : ""
        }`}
        onClick={chooseRewardHandler}
      >
        <div className={styles.funding_price}>
          <Typography
            variant="h4"
            gutterBottom
            color="text.secondary"
            fontWeight="bold"
          >
            {price}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{ ml: 2, mt: 1 }}
          >
            SSF
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            color="text.secondary"
            sx={{ ml: 2, mt: 1 }}
          >
            펀딩
          </Typography>
        </div>
        <div className={styles.title}>
          <Typography variant="h6" gutterBottom fontWeight="800" sx={{ ml: 4 }}>
            {`${title} ${unit}`}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ ml: 4, my: "auto" }}
          >
            (<span>{residual}</span> 개 남음)
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
      {isClicked && (
        <div className={styles.select}>
          <CustomSelect endNumber={10} onSelectChange={selectChangeHandler} />
        </div>
      )}
    </>
  );
};
export default EachRewardItem;

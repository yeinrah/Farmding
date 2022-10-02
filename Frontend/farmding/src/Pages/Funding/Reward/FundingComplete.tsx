// scss
import styles from "./FundingComplete.module.scss";

//mui

import Typography from "@mui/material/Typography";

import CustomBtn from "../../../Common/UI/CustomBtn/CustomBtn";

import { useRecoilState } from "recoil";
import { currentUserNameState } from "../../../Recoil/atoms/account";

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
    useRecoilState<string>(currentUserNameState);

  const fundingAmount = price * selectedQuantity + shippingFee;

  const getNFTHandler = () => {};

  return (
    <>
      <div className={styles.modal_title}>펀딩이 완료되었습니다.</div>
      <div className={styles.modal_content}>
        <div>
          <span>{currentUserName}</span>
          님의 펀딩 내역은
        </div>
        <div>다음과 같습니다.</div>
      </div>

      <div className={styles.reward_confirm_box}>
        <div className={styles.funding_amount_price}>
          <Typography sx={{ fontSize: 18, color: "#868686" }}>
            총 펀딩금액
          </Typography>
          <div className={styles.funding_price}>
            <div className={styles.price}>{fundingAmount}</div>
            <Typography sx={{ ml: 2, fontSize: 20 }}>SSF</Typography>
            <Typography sx={{ fontSize: 14, color: "#868686", my: "auto" }}>
              (배송비 포함)
            </Typography>
          </div>
        </div>
        <div className={styles.title}>
          <Typography variant="h6" gutterBottom fontWeight="800" sx={{ ml: 4 }}>
            {`${title} ${unit}`}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#868686", my: "auto" }}>
            수량: <span>{selectedQuantity}</span> 개
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
    </>
  );
};
export default FundingComplete;

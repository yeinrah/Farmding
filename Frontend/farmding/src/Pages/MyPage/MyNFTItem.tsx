import styles from "./MyNFTItem.module.scss";
import { Avatar, FormControlLabel, Switch } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
interface MyNFTInfo {
  userName: string;
  nftName: string;
  nftPrice: number;
  image: string;
  show: boolean;
}
interface MyNFTitemProps {
  MyNFTInfo: MyNFTInfo;
}
const MyNFTItem = ({ MyNFTInfo }: MyNFTitemProps) => {
  return (
    <>
      <div className={styles.NFTBox}>
        <img className={styles.nft} alt="nft1" src={MyNFTInfo.image} />
        <div className={styles.nftInfo}>
          <span className={styles.nftName}>{MyNFTInfo.nftName}</span>
          <div className={styles.priceBlock}>
            <LocalAtmIcon />
            <span className={styles.nftPrice}>{MyNFTInfo.nftPrice}</span>
          </div>
        </div>
        <FormControlLabel
          sx={{ display: "flex", justifyContent: "center" }}
          value="top"
          control={<Switch color="success" />}
          label="판매 등록"
          labelPlacement="top"
        />
      </div>
    </>
  );
};
export default MyNFTItem;

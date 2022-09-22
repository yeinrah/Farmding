import { Avatar } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import styles from "./NFTItem.module.scss";
interface NFTInfo {
  userName: string;
  nftName: string;
  nftPrice: number;
  image: string;
}
interface NFTitemProps {
  NFTInfo: NFTInfo;
}
const NFTItem = ({ NFTInfo }: NFTitemProps) => {
  return (
    <div className={styles.NFTBox}>
      <div className={styles.userInfo}>
        <Avatar alt="k" sx={{ width: 24, height: 24 }} />
        <span className={styles.userTitle}>{NFTInfo.userName}</span>
      </div>
      <img className={styles.nft} alt="nft1" src={NFTInfo.image} />
      <div className={styles.nftInfo}>
        <span className={styles.nftName}>{NFTInfo.nftName}</span>
        <div className={styles.priceBlock}>
          <LocalAtmIcon />
          <span className={styles.nftPrice}>{NFTInfo.nftPrice}</span>
        </div>
      </div>
    </div>
  );
};
export default NFTItem;

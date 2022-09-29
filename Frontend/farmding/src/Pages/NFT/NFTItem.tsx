import { Avatar } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import styles from "./NFTItem.module.scss";
interface NFTInfo {
  nftId: number;
  fundingId: number;
  nftAddress: string;
  ownerWalletAddress: string;
  currentPrice: number;
  ownerNickname: string;
  onSale: boolean;
}
interface NFTitemProps {
  NFTInfo: NFTInfo;
}
const NFTItem = ({ NFTInfo }: NFTitemProps) => {
  return (
    <div className={styles.NFTBox}>
      <div className={styles.userInfo}>
        <Avatar alt={NFTInfo.ownerNickname} sx={{ width: 24, height: 24 }} />
        <span className={styles.userTitle}>{NFTInfo.ownerNickname}</span>
      </div>
      <img
        className={styles.nft}
        alt="nft1"
        src={`https://${NFTInfo.nftAddress}`}
      />
      <div className={styles.nftInfo}>
        <span className={styles.nftName}>{`farmer# ${NFTInfo.nftId}`}</span>
        <div className={styles.priceBlock}>
          <LocalAtmIcon />
          <span className={styles.nftPrice}>{NFTInfo.currentPrice}</span>
        </div>
      </div>
    </div>
  );
};
export default NFTItem;

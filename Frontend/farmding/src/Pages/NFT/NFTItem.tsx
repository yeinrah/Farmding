import { Avatar, Typography } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import styles from "./NFTItem.module.scss";
const NFTItem = () => {
  return (
    <div className={styles.NFTBox}>
      <div className={styles.userInfo}>
        <Avatar alt="k" sx={{ width: 24, height: 24 }} />
        <span className={styles.userTitle}>wjdtj</span>
      </div>
      <img className={styles.nft} alt="nft1" src="/Assets/NFT1.PNG" />
      <div className={styles.nftInfo}>
        <Typography>Farmer#123</Typography>
        <LocalAtmIcon />
        <Typography>0.05</Typography>
      </div>
    </div>
  );
};
export default NFTItem;

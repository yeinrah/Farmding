import { Avatar } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import styles from "./NFTItem.module.scss";
import profileImages from "../../Assets/profile/profileImages";
import { useEffect, useState } from "react";
interface NFTInfo {
  nftId: number;
  fundingId: number;
  nftAddress: string;
  ownerWalletAddress: string;
  currentPrice: number;
  ownerNickname: string;
  onSale: boolean;
  count: number;
}
interface NFTitemProps {
  NFTInfo: NFTInfo;
  getMyInfo: (wallet: string) => {};
}
const NFTItem = ({ NFTInfo, getMyInfo }: NFTitemProps) => {
  const [image, setImage] = useState(0);
  const [myProfile, setMyProfile] = useState<any>([]);
  const loadUserImage = async () => {
    const account = NFTInfo.ownerWalletAddress;
    const result: any = await getMyInfo(account);
    setImage(result.data.user.profileImage);
    let temp: any[] = [];
    for (let nftImage of result.data.nft) {
      temp.push(nftImage.nftAddress);
    }
    setMyProfile(temp);
  };
  useEffect(() => {
    loadUserImage();
  });
  return (
    <div className={styles.NFTBox}>
      <div className={styles.userInfo}>
        <Avatar
          alt={NFTInfo.ownerNickname}
          sx={{ width: 24, height: 24 }}
          src={`https://${myProfile[image]}`}
        />
        <span className={styles.userTitle}>{NFTInfo.ownerNickname}</span>
      </div>
      <img
        className={styles.nft}
        alt="nft1"
        src={`https://${NFTInfo.nftAddress}`}
      />
      <div className={styles.nftInfo}>
        <span className={styles.nftName}>{`farmer# ${NFTInfo.count}`}</span>
        <div className={styles.priceBlock}>
          <LocalAtmIcon />
          <span className={styles.nftPrice}>{NFTInfo.currentPrice}</span>
        </div>
      </div>
    </div>
  );
};
export default NFTItem;

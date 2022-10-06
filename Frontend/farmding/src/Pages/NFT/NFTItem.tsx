import { Avatar } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import styles from "./NFTItem.module.scss";
import profileImages from "../../Assets/profile/profileImages";
import { useEffect, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import { mainGreen } from "../../Common/data/Style";
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
  const [myname, setMyName] = useState();
  const loadUserImage = async () => {
    const account = NFTInfo.ownerWalletAddress;
    const result: any = await getMyInfo(account);
    setImage(result.data.user.profileImage);
    let temp: any[] = [{}];
    for (let nftImage of result.data.nft) {
      temp.push(nftImage.nftAddress);
    }
    setMyName(result.data.user.nickname);
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
          sx={{ width: 35, height: 35 }}
          src={
            image === 0
              ? process.env.PUBLIC_URL + "/Assets/defaultProfile.png"
              : `https://${myProfile[image]}`
          }
        />
        <span className={styles.userTitle}>{myname}</span>
      </div>
      <img
        className={styles.nft}
        alt="nft1"
        src={`https://${NFTInfo.nftAddress}`}
      />
      <div className={styles.nftInfo}>
        <span className={styles.nftName}>{`farmer# ${NFTInfo.count}`}</span>
        <div className={styles.priceBlock}>
          {/* <AttachMoneyIcon /> */}
          {<PaidIcon sx={{ color: mainGreen }} />}
          <span className={styles.nftPrice}>{NFTInfo.currentPrice}</span>
        </div>
      </div>
    </div>
  );
};
export default NFTItem;

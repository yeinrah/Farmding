import styles from "./BuyingNFT.module.scss";
import { Avatar, Box, Button, Typography } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { modalStyle } from "../../Common/data/Style";
import {
  NFTAddress,
  nftContract,
  ssafyTokenContract,
} from "../../Common/ABI/abi";
import { changeOnSale, updateNFTOwner } from "../../Common/API/NFTApi";
import { Console } from "console";
import { getMyInfo } from "../../Common/API/userApi";
import Spinner from "../../Common/UI/Spinner/Spinner";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
interface IBuyingNFT {
  NFTInfo: NFTInfo;
  onClose: () => void;
  loadSellingNFTList: () => void;
}
interface NFTInfo {
  nftId: string;
  fundingId: number;
  nftAddress: string;
  ownerWalletAddress: string;
  currentPrice: number;
  ownerNickname: string;
  onSale: boolean;
  count: number;
}
const BuyingNFT = ({ NFTInfo, onClose, loadSellingNFTList }: IBuyingNFT) => {
  const { ethereum } = window;
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(0);
  const [myProfile, setMyProfile] = useState<any>([]);
  const loadUser = async () => {
    const account = NFTInfo.ownerWalletAddress;
    const result: any = await getMyInfo(account);
    setImage(result.data.user.profileImage);
    let temp: any[] = [{}];
    for (let nftImage of result.data.nft) {
      temp.push(nftImage.nftAddress);
    }
    setMyProfile(temp);
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      {isLoading && <Spinner />}
      <Box
        sx={{
          ...modalStyle,
          width: 500,
          height: 500,
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={
              image === 0
                ? process.env.PUBLIC_URL + "/Assets/defaultProfile.png"
                : `https://${myProfile[image]}`
            }
          />
          <Typography
            id="modal-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{ mb: 4, marginLeft: "13px" }}
          >
            {NFTInfo.ownerNickname}
          </Typography>
        </Box>
        <img
          src={`https://${NFTInfo.nftAddress}`}
          alt="ntfImage"
          className={styles.NFTimg}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <LocalAtmIcon sx={{ fontSize: 50 }} />
          <span className={styles.nftPrice}>{NFTInfo.currentPrice}</span>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={async () => {
              setIsLoading(true);
              try {
                const accounts = await ethereum.request({
                  method: "eth_requestAccounts",
                });
                const a = await ssafyTokenContract.methods
                  .approve(NFTAddress, NFTInfo.currentPrice)
                  .send({ from: accounts[0] });
                console.log(a);
                console.log(NFTInfo);
                const myInfo = await getMyInfo(accounts[0]);
                console.log(myInfo.data.user.nickname);
                const b = await nftContract.methods
                  .purchase(NFTInfo.count)
                  .send({ from: accounts[0] });
                console.log(b);
                await updateNFTOwner(
                  NFTInfo.count,
                  myInfo.data.user.nickname,
                  accounts[0]
                );
                await changeOnSale(NFTInfo.count);
                onClose();
                Swal.fire({
                  icon: "success",
                  title: "구매 완료",
                });
                loadSellingNFTList();
                setIsLoading(false);
              } catch {
                setIsLoading(false);
              }
            }}
          >
            구매
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={onClose}
          >
            취소
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default BuyingNFT;

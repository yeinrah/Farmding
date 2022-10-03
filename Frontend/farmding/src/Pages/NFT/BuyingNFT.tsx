import styles from "./BuyingNFT.module.scss";
import { Avatar, Box, Button, Typography } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { modalStyle } from "../../Common/data/Style";
import { nftContract, ssafyTokenContract } from "../../Common/ABI/abi";
import { changeOnSale, updateNFTOwner } from "../../Common/API/NFTApi";
import { Console } from "console";
import { getMyInfo } from "../../Common/API/userApi";
import Spinner from "../../Common/UI/Spinner/Spinner";
import { useState } from "react";
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
          <Avatar />
          <Typography
            id="modal-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{ mb: 3, marginLeft: "10px" }}
          >
            {NFTInfo.ownerNickname}
          </Typography>
        </Box>
        <img
          src={`https://${NFTInfo.nftAddress}`}
          alt="ntfImage"
          className={styles.NFTimg}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LocalAtmIcon />
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
                  .approve(
                    "0x1C0b492C9306F5A0D0421ADe32A116c3F1016F1b",
                    NFTInfo.currentPrice
                  )
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
                alert("구매완료");
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

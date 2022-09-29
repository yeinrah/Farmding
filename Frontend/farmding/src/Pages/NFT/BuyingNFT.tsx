import styles from "./BuyingNFT.module.scss";
import { Avatar, Box, Button, Typography } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { modalStyle } from "../../Common/data/Style";
import { nftContract, ssafyTokenContract } from "../../Common/ABI/abi";
import { changeOnSale, updateNFTOwner } from "../../Common/API/NFTApi";
import { Console } from "console";
import { getMyInfo } from "../../Common/API/userApi";
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
}
const BuyingNFT = ({ NFTInfo, onClose, loadSellingNFTList }: IBuyingNFT) => {
  const { ethereum } = window;
  return (
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
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            const a = await ssafyTokenContract.methods
              .approve(
                "0xb2b0d8d32D4861dF47e308f2DDD970CDADb79eEa",
                NFTInfo.currentPrice
              )
              .send({ from: accounts[0] });
            console.log(a);
            console.log(NFTInfo);
            const myInfo = await getMyInfo(accounts[0]);
            console.log(myInfo.data.user.nickname);
            const b = await nftContract.methods
              .purchase(NFTInfo.nftId)
              .send({ from: accounts[0] });
            console.log(b);
            await updateNFTOwner(
              NFTInfo.nftId,
              myInfo.data.user.nickname,
              accounts[0]
            );
            await changeOnSale(NFTInfo.nftId);
            onClose();
            alert("구매완료");
            loadSellingNFTList();
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
  );
};
export default BuyingNFT;

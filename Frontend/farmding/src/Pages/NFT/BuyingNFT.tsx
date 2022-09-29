import styles from "./BuyingNFT.module.scss";
import { Avatar, Box, Button, Typography } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { modalStyle } from "../../Common/data/Style";
import { nftContract, ssafyTokenContract } from "../../Common/ABI/abi";
import { changeOnSale, updateNFTOwner } from "../../Common/API/NFTApi";
interface IBuyingNFT {
  NFTInfo: NFTInfo;
  onClose: () => void;
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
const BuyingNFT = ({ NFTInfo, onClose }: IBuyingNFT) => {
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
            await ssafyTokenContract.methods
              .approve(
                "0xcF39B0Da1C6946349971D80983800E54a8D43495",
                NFTInfo.currentPrice
              )
              .send({ from: accounts[0] });
            await nftContract.methods
              .purchase(NFTInfo.currentPrice)
              .send({ from: accounts[0] });
            await updateNFTOwner(
              NFTInfo.nftId,
              NFTInfo.ownerNickname,
              NFTInfo.ownerWalletAddress
            );
            await changeOnSale(NFTInfo.nftId)
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

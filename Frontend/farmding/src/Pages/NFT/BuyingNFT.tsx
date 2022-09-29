import styles from "./BuyingNFT.module.scss";
import { Avatar, Box, Button, Typography } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { modalStyle } from "../../Common/data/Style";
import { nftContract, ssafyTokenContract } from "../../Common/ABI/abi";
import { changeOnSale, updateNFTOwner } from "../../Common/API/NFTApi";
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
                "0x1B525BACF85485f2655bc33931ecB36AAde990f0",
                NFTInfo.currentPrice
              )
              .send({ from: accounts[0] });
            console.log(a);
            const b = await nftContract.methods
              .purchase(NFTInfo.nftId)
              .send({ from: accounts[0] });
            console.log(b);
            await updateNFTOwner(
              NFTInfo.nftId,
              NFTInfo.ownerNickname,
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

import styles from "./BuyingNFT.module.scss";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { modalStyle } from "../../Common/data/Style";
interface IBuyingNFT {
  NFTInfo: NFTInfo;
}
interface NFTInfo {
  nftId: number;
  fundingId: number;
  nftAddress: string;
  ownerWalletAddress: string;
  currentPrice: number;
  ownerNickname: string;
  onSale: boolean;
}
const BuyingNFT = ({ NFTInfo }: IBuyingNFT) => {
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
        <Button variant="contained" color="success" size="large">
          구매
        </Button>
        <Button variant="contained" color="error" size="large">
          취소
        </Button>
      </Box>
    </Box>
  );
};
export default BuyingNFT;

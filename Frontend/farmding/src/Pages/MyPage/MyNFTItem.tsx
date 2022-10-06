import styles from "./MyNFTItem.module.scss";
import { Avatar, FormControlLabel, Modal, Switch } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import UpdateNFTPrice from "./UpdateNFTPrice";
import { useEffect, useState } from "react";
import { NFTAddress, nftContract } from "../../Common/ABI/abi";
import { changeOnSale } from "../../Common/API/NFTApi";
import { Sell } from "@mui/icons-material";
import Spinner from "../../Common/UI/Spinner/Spinner";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import { mainGreen } from "../../Common/data/Style";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    success: {
      main: mainGreen,
    },
  },
});
interface MyNFTInfo {
  nftId: string;
  currentPrice: number;
  nftAddress: string;
  onSale: boolean;
  ownerNickname: string;
  ownerWalletAddress: string;
  count: number;
}
interface MyNFTitemProps {
  MyNFTInfo: MyNFTInfo;
  getInfoNFT: () => {};
}
const MyNFTItem = ({ MyNFTInfo, getInfoNFT }: MyNFTitemProps) => {
  const [open, setOpen] = useState(false);
  const [sellOn, setSellOn] = useState(MyNFTInfo.onSale);
  const [price, setPrice] = useState(MyNFTInfo.currentPrice);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { ethereum } = window;
  const changeSell = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      await nftContract.methods
        .approve(NFTAddress, MyNFTInfo.count)
        .send({ from: accounts[0] });
      await nftContract.methods
        .createSell(MyNFTInfo.count, MyNFTInfo.currentPrice)
        .send({ from: accounts[0] });
      return true;
    } catch {
      return false;
    }
  };
  const cancleSell = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      await nftContract.methods
        .cancelSell(MyNFTInfo.count)
        .send({ from: accounts[0] });
      return true;
    } catch {
      return false;
    }
  };
  const changePrice = (price: number) => {
    setPrice(price);
  };
  useEffect(() => {
    getInfoNFT();
  }, [price, sellOn]);
  return (
    <>
      <ThemeProvider theme={theme}>
        {isLoading && <Spinner />}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          // aria-describedby="modal-modal-description"
        >
          <UpdateNFTPrice
            count={MyNFTInfo.count}
            nftPrice={MyNFTInfo.currentPrice}
            onClose={handleClose}
            changePrice={changePrice}
            isSelling={MyNFTInfo.onSale}
          />
          {/* <SuccessModal /> */}
        </Modal>
        <div className={styles.NFTBox}>
          <img
            className={styles.nft}
            alt="nft1"
            src={`https://${MyNFTInfo.nftAddress}`}
          />
          <div className={styles.nftInfo}>
            <span className={styles.nftName}>
              {"farmer#" + MyNFTInfo.count}
            </span>
            <div
              className={styles.priceBlock}
              onClick={() => {
                handleOpen();
              }}
            >
              {/* <AttachMoneyIcon /> */}
              <PaidIcon sx={{ color: mainGreen, mt: 0.5 }} />
              <span className={styles.nftPrice}>{price}</span>
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              paddingLeft: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                color: sellOn ? mainGreen : "gray",
              }}
            >
              판매 등록
            </Box>
            <FormControlLabel
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: "30px",
                width: "30px",
              }}
              value="top"
              control={<Switch color="success" />}
              label=""
              labelPlacement="top"
              checked={sellOn}
              onClick={async () => {
                setIsLoading(true);
                console.log(sellOn, MyNFTInfo.count);
                try {
                  getInfoNFT();
                  if (!sellOn) {
                    if (await changeSell()) {
                      await changeOnSale(MyNFTInfo.count);
                      setSellOn(!sellOn);
                    }
                    setIsLoading(false);
                  } else {
                    if (await cancleSell()) {
                      await changeOnSale(MyNFTInfo.count);
                      setSellOn(!sellOn);
                    }
                    setIsLoading(false);
                  }
                  // setIsLoading(false);
                } catch {
                  setIsLoading(false);
                }
              }}
            />
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
};
export default MyNFTItem;

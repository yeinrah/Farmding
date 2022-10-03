import styles from "./MyNFTItem.module.scss";
import { Avatar, FormControlLabel, Modal, Switch } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import UpdateNFTPrice from "./UpdateNFTPrice";
import { useEffect, useState } from "react";
import { nftContract } from "../../Common/ABI/abi";
import { changeOnSale } from "../../Common/API/NFTApi";
import { Sell } from "@mui/icons-material";
import Spinner from "../../Common/UI/Spinner/Spinner";
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
        .approve("0x1C0b492C9306F5A0D0421ADe32A116c3F1016F1b", MyNFTInfo.count)
        .send({ from: accounts[0] });
      await nftContract.methods
        .createSell(MyNFTInfo.count, MyNFTInfo.currentPrice)
        .send({ from: accounts[0] });
      return true;
    } catch {
      console.log("Ha");
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
          <span className={styles.nftName}>{"farmer#" + MyNFTInfo.count}</span>
          <div
            className={styles.priceBlock}
            onClick={() => {
              handleOpen();
            }}
          >
            <LocalAtmIcon />
            <span className={styles.nftPrice}>{price}</span>
          </div>
        </div>
        <FormControlLabel
          sx={{ display: "flex", justifyContent: "center" }}
          value="top"
          control={<Switch color="success" />}
          label="판매 등록"
          labelPlacement="top"
          checked={sellOn}
          onClick={async () => {
            setIsLoading(true);
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
      </div>
    </>
  );
};
export default MyNFTItem;

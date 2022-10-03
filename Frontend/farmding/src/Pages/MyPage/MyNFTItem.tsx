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
        .approve("0xd9145CCE52D386f254917e481eB44e9943F39138", MyNFTInfo.nftId)
        .send({ from: accounts[0] });
      await nftContract.methods
        .createSell(MyNFTInfo.nftId, MyNFTInfo.currentPrice)
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
        .cancelSell(MyNFTInfo.nftId)
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
          nftId={MyNFTInfo.nftId}
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
          <span className={styles.nftName}>{"farmer#" + MyNFTInfo.nftId}</span>
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
                  await changeOnSale(MyNFTInfo.nftId);
                  setSellOn(!sellOn);
                }
                setIsLoading(false);
              } else {
                if (await cancleSell()) {
                  await changeOnSale(MyNFTInfo.nftId);
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

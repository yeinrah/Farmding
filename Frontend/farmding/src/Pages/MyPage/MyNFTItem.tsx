import styles from "./MyNFTItem.module.scss";
import { Avatar, FormControlLabel, Modal, Switch } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import UpdateNFTPrice from "./UpdateNFTPrice";
import { useEffect, useState } from "react";
import { nftContract } from "../../Common/ABI/abi";
import { changeOnSale } from "../../Common/API/NFTApi";
import { Sell } from "@mui/icons-material";
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { ethereum } = window;
  const changeSell = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    await nftContract.methods
      .approve("0x70B9f00DadD22B8771161a655690de58004725dB", MyNFTInfo.nftId)
      .send({ from: accounts[0] });
    await nftContract.methods
      .createSell(MyNFTInfo.nftId, MyNFTInfo.currentPrice)
      .send({ from: accounts[0] });
  };
  const cancleSell = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    let a = await nftContract.methods
      .cancelSell(MyNFTInfo.nftId)
      .send({ from: accounts[0] });
  };
  const changePrice = (price: number) => {
    setPrice(price);
  };
  return (
    <>
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
            await changeOnSale(MyNFTInfo.nftId);
            getInfoNFT();
            if (!sellOn) {
              setSellOn(!sellOn);
              changeSell();
            } else {
              setSellOn(!sellOn);
              cancleSell();
            }
          }}
        />
      </div>
    </>
  );
};
export default MyNFTItem;

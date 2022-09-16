import styles from "./MyNFTItem.module.scss";
import { Avatar, FormControlLabel, Modal, Switch } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import UpdateNFTPrice from "./UpdateNFTPrice";
import { useState } from "react";
interface MyNFTInfo {
  userName: string;
  nftName: string;
  nftPrice: number;
  image: string;
  show: boolean;
}
interface MyNFTitemProps {
  MyNFTInfo: MyNFTInfo;
}
const MyNFTItem = ({ MyNFTInfo }: MyNFTitemProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        // aria-describedby="modal-modal-description"
      >
        <UpdateNFTPrice />
        {/* <SuccessModal /> */}
      </Modal>
      <div className={styles.NFTBox}>
        <img className={styles.nft} alt="nft1" src={MyNFTInfo.image} />
        <div className={styles.nftInfo}>
          <span className={styles.nftName}>{MyNFTInfo.nftName}</span>
          <div
            className={styles.priceBlock}
            onClick={() => {
              handleOpen();
            }}
          >
            <LocalAtmIcon />
            <span className={styles.nftPrice}>{MyNFTInfo.nftPrice}</span>
          </div>
        </div>
        <FormControlLabel
          sx={{ display: "flex", justifyContent: "center" }}
          value="top"
          control={<Switch color="success" />}
          label="판매 등록"
          labelPlacement="top"
        />
      </div>
    </>
  );
};
export default MyNFTItem;

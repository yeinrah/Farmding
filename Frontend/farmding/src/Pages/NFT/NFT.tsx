import styles from "./NFT.module.scss";
import Banner from "../../Common/UI/Banner/Banner";
import SearchBar from "../../Common/UI/SearchBar/SearchBar";
import NFTItem from "./NFTItem";
import { modalStyle } from "../../Common/data/Style";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import BuyingNFT from "./BuyingNFT";
import { sellingNFTList } from "../../Common/API/NFTApi";
import { getMyInfo } from "../../Common/API/userApi";
const NFT = () => {
  const [open, setOpen] = useState(false);
  const [nowItem, setNowItem] = useState(0);
  const [nfts, setNfts] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loadSellingNFTList = async () => {
    const result = await sellingNFTList();
    setNfts(result.data);
  };
  useEffect(() => {
    loadSellingNFTList();
    // loadUserImage();
  }, []);
  const showModal = (selectedNumber: number) => {
    handleOpen();
    setNowItem(selectedNumber);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        // aria-describedby="modal-modal-description"
      >
        <BuyingNFT
          NFTInfo={nfts[nowItem]}
          onClose={handleClose}
          loadSellingNFTList={loadSellingNFTList}
        />
        {/* <SuccessModal /> */}
      </Modal>
      <Banner imgSrc={"/Assets/farmerNFTs.PNG"} isMain={false} />
      <div className={styles.searchBar}>
        <SearchBar placeHolder={"NFT를 검색 하세요."} />
      </div>
      <div className={styles.NFTsBox}>
        <span className={styles.title}>NFT 목록</span>
        {nfts.map((item, index) => {
          return (
            <div
              onClick={() => {
                showModal(index);
              }}
            >
              <NFTItem NFTInfo={item} getMyInfo={getMyInfo} />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default NFT;

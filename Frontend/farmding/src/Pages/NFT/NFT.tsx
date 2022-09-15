import styles from "./NFT.module.scss";
import Banner from "../../Common/UI/Banner/Banner";
import SearchBar from "../../Common/UI/SearchBar/SearchBar";
import NFTItem from "./NFTItem";
import { modalStyle } from "../../Common/data/Style";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import BuyingNFT from "./BuyingNFT";
import SuccessModal from "./SuccessModal";
const NFT = () => {
  const [open, setOpen] = useState(false);
  const [nowItem, setNowItem] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nfts = [
    {
      userName: "wjdtj",
      nftName: "Farmer1#123",
      nftPrice: 0.05,
      image: "/Assets/NFT1.PNG",
    },
    {
      userName: "wjdtj1",
      nftName: "Farmer1#124",
      nftPrice: 0.15,
      image: "/Assets/NFT1.PNG",
    },
    {
      userName: "wjdtj2",
      nftName: "Farmer1#125",
      nftPrice: 0.65,
      image: "/Assets/NFT1.PNG",
    },
    {
      userName: "wjdtj3",
      nftName: "Farmer1#126",
      nftPrice: 0.55,
      image: "/Assets/NFT1.PNG",
    },
    {
      userName: "wjdtj4",
      nftName: "Farmer1#127",
      nftPrice: 0.45,
      image: "/Assets/NFT1.PNG",
    },
    {
      userName: "wjdtj5",
      nftName: "Farmer1#128",
      nftPrice: 0.35,
      image: "/Assets/NFT1.PNG",
    },
    {
      userName: "wjdtj6",
      nftName: "Farmer1#129",
      nftPrice: 1.05,
      image: "/Assets/NFT1.PNG",
    },
    {
      userName: "wjdtj7",
      nftName: "Farmer1#130",
      nftPrice: 0.25,
      image: "/Assets/NFT1.PNG",
    },
    {
      userName: "wjdtj8",
      nftName: "Farmer1#131",
      nftPrice: 0.15,
      image: "/Assets/NFT1.PNG",
    },
  ];
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
        <BuyingNFT NFTInfo={nfts[nowItem]} />
        {/* <SuccessModal /> */}
      </Modal>
      <Banner imgSrc={"/Assets/farmerNFTs.PNG"} isMain={false} />
      <div className={styles.searchBar}>
        <SearchBar placeHolder={"NFT를 검색 하세요."} />
      </div>
      <div className={styles.NFTsBox}>
        <span className={styles.title}>NFT 목록</span>
        {nfts.map((item, index) => (
          <div
            onClick={() => {
              showModal(index);
            }}
          >
            <NFTItem NFTInfo={item} />
          </div>
        ))}
      </div>
    </>
  );
};
export default NFT;

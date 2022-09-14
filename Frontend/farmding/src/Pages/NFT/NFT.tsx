import styles from "./NFT.module.scss";
import Banner from "../../Common/UI/Banner/Banner";
import SearchBar from "../../Common/UI/SearchBar/SearchBar";
import { Typography } from "@mui/material";
import NFTItem from "./NFTItem";

const NFT = () => {
  return (
    <>
      <Banner imgSrc={"/Assets/farmerNFTs.PNG"} isMain={false} />
      <div className={styles.searchBar}>
        <SearchBar placeHolder={"NFT를 검색 하세요."} />
      </div>
      <div className={styles.NFTsBox}>
        <span className={styles.title}>NFT 목록</span>
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
        <NFTItem />
      </div>
    </>
  );
};
export default NFT;

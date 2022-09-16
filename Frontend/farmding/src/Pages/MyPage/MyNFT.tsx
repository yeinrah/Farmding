import { Box } from "@mui/material";
import styles from "./MyNFT.module.scss";
import MyNFTItem from "./MyNFTItem";
const MyNFT = () => {
  const nfts = [
    {
      userName: "wjdtj",
      nftName: "Farmer1#123",
      nftPrice: 0.05,
      image: "/Assets/NFT1.PNG",
      show: true,
    },
    {
      userName: "wjdtj1",
      nftName: "Farmer1#124",
      nftPrice: 0.15,
      image: "/Assets/NFT1.PNG",
      show: true,
    },
    {
      userName: "wjdtj2",
      nftName: "Farmer1#124",
      nftPrice: 0.15,
      image: "/Assets/NFT1.PNG",
      show: true,
    },
    {
      userName: "wjdtj3",
      nftName: "Farmer1#124",
      nftPrice: 0.15,
      image: "/Assets/NFT1.PNG",
      show: true,
    },
    {
      userName: "wjdtj4",
      nftName: "Farmer1#124",
      nftPrice: 0.15,
      image: "/Assets/NFT1.PNG",
      show: true,
    },
  ];
  return (
    <>
      <div className={styles.NFTsBox}>
        {nfts.map((item, index) => (
          <div>
            <MyNFTItem MyNFTInfo={item} />
          </div>
        ))}
      </div>
    </>
  );
};
export default MyNFT;

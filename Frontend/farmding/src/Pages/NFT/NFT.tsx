import styles from "./NFT.module.scss";
import Banner from "../../Common/UI/Banner/Banner";
import SearchBar from "../../Common/UI/SearchBar/SearchBar";
import NFTItem from "./NFTItem";
import { modalStyle } from "../../Common/data/Style";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import BuyingNFT from "./BuyingNFT";
import { getMyNfts, sellingNFTList } from "../../Common/API/NFTApi";
import { getMyInfo } from "../../Common/API/userApi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../Recoil/atoms/auth";
interface NftInfo {
  nftId: number;
  currentPrice: number;
  count: number;
}
const NFT = () => {
  const [open, setOpen] = useState(false);
  const [nowItem, setNowItem] = useState(0);
  const [nfts, setNfts] = useState([]);
  const [itemFilter, setItemFilter] = useState("");
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const { ethereum } = window;
  const navigate = useNavigate();
  const handleChange = (event: any) => {
    setItemFilter(event.target.value);
  };
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
  const isRegisteredUser = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    await getMyNfts(accounts[0]).then((info) => {
      if (!info.data.user.active) {
        navigate("/signup");
      }
    });
  };
  const showModal = (selectedNumber: number) => {
    handleOpen();
    setNowItem(selectedNumber);
  };
  ethereum.on("accountsChanged", (accounts: any) => {
    // SetIsAccountChanged(true);
    setIsLogin(false);
  });
  useEffect(() => {
    console.log(nfts);
    let sortingArr = nfts;
    if (itemFilter === "") {
      sortingArr.sort((a: NftInfo, b: NftInfo) => b.count - a.count);
      setNfts([...sortingArr]);
    } else if (itemFilter === "nameUp") {
      sortingArr.sort((a: NftInfo, b: NftInfo) => a.count - b.count);
      setNfts([...sortingArr]);
    } else if (itemFilter === "nameDown") {
      sortingArr.sort((a: NftInfo, b: NftInfo) => b.count - a.count);
      setNfts([...sortingArr]);
    } else if (itemFilter === "priceUp") {
      sortingArr.sort(
        (a: NftInfo, b: NftInfo) => a.currentPrice - b.currentPrice
      );
      setNfts([...sortingArr]);
    } else if (itemFilter === "priceDown") {
      sortingArr.sort(
        (a: NftInfo, b: NftInfo) => b.currentPrice - a.currentPrice
      );
      setNfts([...sortingArr]);
    }
    console.log(nfts);
  }, [itemFilter]);
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
      <Banner imgSrc={"/Assets/farmerNFTs.png"} isMain={false} />
      <div className={styles.NFTsBox}>
        <div className={styles.topBar}>
          <span className={styles.title}>NFT 목록</span>
          <FormControl sx={{ m: 5, minWidth: 150 }}>
            <Select
              value={itemFilter}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>기본</em>
              </MenuItem>
              <MenuItem value={"nameUp"}>이름 오름차순</MenuItem>
              <MenuItem value={"nameDown"}>이름 내림차순</MenuItem>
              <MenuItem value={"priceUp"}>가격 오름차순</MenuItem>
              <MenuItem value={"priceDown"}>가격 내림차순</MenuItem>
            </Select>
            {/* <FormHelperText>Without label</FormHelperText> */}
          </FormControl>
        </div>
        {nfts.map((item, index) => {
          return (
            <div
              onClick={async () => {
                isRegisteredUser();
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

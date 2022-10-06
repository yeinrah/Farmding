import styles from "./NFT.module.scss";
import Banner from "../../Common/UI/Banner/Banner";
import SearchBar from "../../Common/UI/SearchBar/SearchBar";
import NFTItem from "./NFTItem";
import { modalStyle } from "../../Common/data/Style";
import {
  Button,
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
import { useInView } from "react-intersection-observer";
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
  const [ref, inView] = useInView({ initialInView: false });
  const [max, setMax] = useState<number>(8);
  const { ethereum } = window;
  const navigate = useNavigate();
  const handleChange = (event: any) => {
    setItemFilter(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loadSellingNFTList = async () => {
    const result = await sellingNFTList();
    setNfts(result.data.slice(0, max));
  };
  useEffect(() => {
    loadSellingNFTList();
    // loadUserImage();
  }, []);
  useEffect(() => {
    setMax(max + 8);
  }, [inView]);
  useEffect(() => {
    loadSellingNFTList();
  }, [max]);
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
          <span className={styles.title}>판매중인 NFT 목록</span>
          <FormControl sx={{ m: 5, minWidth: 125 }} size="small">
            <Select
              value={itemFilter}
              onChange={handleChange}
              displayEmpty
              // color="success"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <div>기본</div>
              </MenuItem>
              {/* <MenuItem value={"nameUp"}>이름 오름차순</MenuItem>
              <MenuItem value={"nameDown"}>이름 내림차순</MenuItem> */}
              <MenuItem value={"priceUp"}>낮은가격순</MenuItem>
              <MenuItem value={"priceDown"}>높은가격순</MenuItem>
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
              {index !== max - 1 && (
                <NFTItem NFTInfo={item} getMyInfo={getMyInfo} />
              )}
              {index === max - 1 && <Button ref={ref}></Button>}
              {/* {index === max-1 && <NFTItem NFTInfo={item} getMyInfo={getMyInfo} />} */}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default NFT;

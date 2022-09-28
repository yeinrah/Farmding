import {
  Avatar,
  Box,
  Button,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import styles from "./MyPage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import MyProject from "./MyProject";
import MyNFT from "./MyNFT";
import UserInfoUpdate from "./UserInfoUpdate";
import UpdateNickName from "./UpdateNickName";
import UpdateProfileImg from "./UpdateProfileImg";
import { nftContract } from "../../Common/ABI/abi";
import { registerNFT } from "../../Common/API/NFTApi";
import { getMyInfo } from "../../Common/API/userApi";
const MyPage = () => {
  const [value, setValue] = useState("one");
  const [open, setOpen] = useState(false);
  const [addrOpen, setAddrOpen] = useState<Boolean>(false);
  const [nickOpen, setNickOpen] = useState<Boolean>(false);
  const [profileOpen, setProfileOpen] = useState<Boolean>(false);
  const [account, setAccount] = useState("");
  const { ethereum } = window;
  const handleOpen = () => setOpen(true);
  const handleAddrOpen = () => setAddrOpen(true);
  const handleNickOpen = () => setNickOpen(true);
  const handleProfileOpen = () => setProfileOpen(true);
  const handleClose = () => {
    setAddrOpen(false);
    setNickOpen(false);
    setProfileOpen(false);
    setOpen(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {});
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        // aria-describedby="modal-modal-description"
      >
        <>
          {addrOpen && <UserInfoUpdate />}
          {nickOpen && <UpdateNickName />}
          {profileOpen && <UpdateProfileImg />}
        </>
        {/* <SuccessModal /> */}
      </Modal>
      <Box
        sx={{
          width: "60%",
          margin: "5rem auto",
        }}
      >
        <Box sx={{ display: "flex", width: "100%", overflow: "auto" }}>
          <Avatar
            sx={{
              width: "10rem",
              height: "8rem",
              cursor: "pointer",
              margin: "2rem 0",
            }}
            onClick={() => {
              handleOpen();
              handleProfileOpen();
            }}
          />
          <Box sx={{ width: "100%", marginLeft: "2rem" }}>
            <Box sx={{ display: "flex", margin: "0.8rem 0" }}>
              <Typography
                sx={{ color: "#5DAE8B", fontSize: "2rem", fontWeight: "bold" }}
              >
                nickname
              </Typography>
              <EditIcon
                sx={{ margin: "auto 1rem", cursor: "pointer" }}
                onClick={() => {
                  handleOpen();
                  handleNickOpen();
                }}
              />
            </Box>
            <Typography sx={{ margin: "1rem 0" }}>안녕하세요</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{ color: "#5DAE8B", fontWeight: "bold", margin: "auto 0" }}
              >{`배송지주소 : `}</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleOpen();
                  handleAddrOpen();
                }}
              >
                배송지 수정
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{
              sx: { backgroundColor: "#5DAE8B" },
            }}
            aria-label="secondary tabs example"
            centered
          >
            <Tab
              value="one"
              label="내가 후원한 프로젝트"
              sx={{ color: "#5DAE8B", width: "50%" }}
            ></Tab>
            <Tab
              value="two"
              label="나의 NFT"
              sx={{ color: "#5DAE8B", width: "50%" }}
            />
          </Tabs>
        </Box>
        {value === "one" && (
          <>
            <MyProject />
            <MyProject />
          </>
        )}
        {value === "two" && (
          <>
            <MyNFT />
          </>
        )}
        <Button
          onClick={async () => {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
            alert(accounts[0]);
            await nftContract.methods
              .mint(accounts[0], 1)
              .send({ from: accounts[0] });
            const nowNickName = await getMyInfo(accounts[0]);
            await registerNFT("", accounts[0], nowNickName);
          }}
        >
          Minting
        </Button>
      </Box>
    </>
  );
};
export default MyPage;

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
import { countNFT, getMyNfts, registerNFT } from "../../Common/API/NFTApi";
import { deleteUser, getMyInfo } from "../../Common/API/userApi";
import profileImages from "../../Assets/profile/profileImages";
import MyProjectList from "./MyProjectList";
import CustomBtn from "../../Common/UI/CustomBtn/CustomBtn";
import { useNavigate } from "react-router-dom";
import { isAccountChangedState } from "../../Recoil/atoms/account";
import { useRecoilState } from "recoil";
import { loginState } from "../../Recoil/atoms/auth";
import Spinner from "../../Common/UI/Spinner/Spinner";
import { mainGreen } from "../../Common/data/Style";

// interface UserInfo {
//   userId: number;
//   nickname: string;
//   walletAddress: string;
//   phoneNumber: string;
//   profileImage: number;
// }
const MyPage = () => {
  const [value, setValue] = useState("one");
  const [open, setOpen] = useState(false);
  const [addrOpen, setAddrOpen] = useState<Boolean>(false);
  const [nickOpen, setNickOpen] = useState<Boolean>(false);
  const [profileOpen, setProfileOpen] = useState<Boolean>(false);
  const [myProfile, setMyProfile] = useState<any>([]);
  const [account, setAccount] = useState("");
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    address: "",
    profileImage: 0,
    userPr: "",
    walletAddress: "",
    active: false,
  });
  const [NFTInfo, setNFTInfo] = useState("");
  const { ethereum } = window;
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleAddrOpen = () => setAddrOpen(true);
  const handleNickOpen = () => setNickOpen(true);
  const handleProfileOpen = () => {
    if (myProfile.length === 0) {
      alert("선택가능한 NFT가 없습니다.");
      handleClose();
      return;
    }
    setProfileOpen(true);
  };
  const handleClose = () => {
    setAddrOpen(false);
    setNickOpen(false);
    setProfileOpen(false);
    setOpen(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const getInfoUser = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    await getMyNfts(accounts[0]).then((info) => {
      console.log(info.data.user);
      setUserInfo(info.data.user);
    });
  };
  const getInfoNFT = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    await getMyNfts(accounts[0]).then((info) => {
      setNFTInfo(info.data.nft);
      if (!info.data.user.active) {
        navigate("/signup");
      }
      let temp: any[] = [];
      for (let nftImage of info.data.nft) {
        temp.push(nftImage.nftAddress);
      }

      setMyProfile(temp);
    });
  };
  const modifyAddrHandler = () => {
    handleOpen();
    handleAddrOpen();
  };
  // const setNFTCnt = async () => {
  //   const cntNFT = await countNFT();
  //   setNftCount(cntNFT.data);
  //   return cntNFT.data;
  ethereum.on("accountsChanged", (accounts: any) => {
    setIsLogin(false);
  });
  // const changeAccount = async () => {
  //   const accounts = await ethereum.request({ method: "eth_accounts" });
  //   if (!accounts.length) {
  //     setIsLogin(false);
  //     // navigate("/login");
  //     // return;
  //   }
  //   setAccount(accounts[0]);
  //   SetIsAccountChanged(!isAccountChanged);

  // };
  useEffect(() => {
    getInfoUser();
    getInfoNFT();
  }, []);
  // useEffect(() => {
  //   changeAccount();
  // }, [isAccountChanged]);
  return (
    <>
      {isLoading && <Spinner />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        // aria-describedby="modal-modal-description"
      >
        <>
          {addrOpen && (
            <UserInfoUpdate
              handleClose1={handleClose}
              changeAddress={setUserInfo}
              userInfo={userInfo}
            />
          )}
          {nickOpen && (
            <UpdateNickName
              handleClose={handleClose}
              changeInfo={setUserInfo}
              userInfo={userInfo}
            />
          )}
          {profileOpen && (
            <UpdateProfileImg
              handleClose={handleClose}
              changeProfile={setUserInfo}
              userInfo={userInfo}
              myProfile={myProfile}
            />
          )}
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
              height: "10rem",
              cursor: "pointer",
            }}
            src={`https://${myProfile[userInfo.profileImage]}`}
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
                {userInfo.nickname}
              </Typography>
              <EditIcon
                sx={{ margin: "auto 1rem", cursor: "pointer" }}
                onClick={() => {
                  handleOpen();
                  handleNickOpen();
                }}
              />
            </Box>
            <Typography sx={{ margin: "1rem 0" }}>{userInfo.userPr}</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{ color: "#5DAE8B", fontWeight: "bold", margin: "auto 0" }}
              >{`배송지주소 : ${userInfo.address}`}</Typography>
              <CustomBtn
                customSx={{
                  width: "130px",
                  height: "40px",
                  fontSize: "15px",
                  letterSpacing: 2,
                }}
                bgColor={"mainPink"}
                onclick={modifyAddrHandler}
                btnWord={"배송지 수정"}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{
              sx: { backgroundColor: mainGreen },
            }}
            // aria-label="secondary tabs example"
            centered
          >
            <Tab
              value="one"
              label="나의 NFT"
              sx={{ color: mainGreen, width: "50%" }}
            ></Tab>
            <Tab
              value="two"
              label="내가 펀딩한 프로젝트"
              sx={{ color: mainGreen, width: "50%" }}
            />
          </Tabs>
        </Box>
        {value === "one" && (
          <>
            <MyNFT nfts={NFTInfo} getInfoNFT={getInfoNFT} />
          </>
        )}
        {value === "two" && (
          <>
            <MyProjectList />
            {/* <MyProject /> */}
          </>
        )}
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "90%",
            background: "red",
            color: "white",
            margin: "auto",
            "&:hover": { background: "#a3261f" },
          }}
          onClick={async () => {
            await deleteUser(userInfo.walletAddress);
            alert("회원탈퇴 되었습니다.");
            navigate("/");
          }}
        >
          회원 탈퇴
        </Button>
      </Box>
    </>
  );
};
export default MyPage;

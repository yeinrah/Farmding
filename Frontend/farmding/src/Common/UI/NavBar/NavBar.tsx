import { useState, useEffect } from "react";
// component
import LikeFundings from "./LikeFundings";

import { mainGreen, mainPink } from "../../data/Style";
// scss
import styles from "./NavBar.module.scss";
// router
import { Link, Navigate, useNavigate } from "react-router-dom";
// mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { useRecoilState } from "recoil";
import { loginState } from "../../../Recoil/atoms/auth";
import { fetchLikeFundingLists } from "../../API/likeFundingAPI";
import {
  currentProfileImageState,
  currentUserIdState,
} from "../../../Recoil/atoms/account";
import {
  IFundingTypes,
  navLikeButtonChangeState,
  likeFundingsListState,
} from "../../../Recoil/atoms/funding";
import { getMyNfts } from "../../API/NFTApi";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: mainPink,
    color: "white",
    padding: "9px 6px",
  },
}));

const NavBar = () => {
  const { ethereum } = window;
  const [currentUserId, setCurrentUserId] =
    useRecoilState<number>(currentUserIdState);
  const [likeFundings, setLikeFundings] = useRecoilState<IFundingTypes[]>(
    likeFundingsListState
  );
  const [isNavLikeChange, setIsNavLikeChange] = useRecoilState<boolean>(
    navLikeButtonChangeState
  );
  const [isCurrentProfileImage, setIsCurrentProfileImage] =
    useRecoilState<string>(currentProfileImageState);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState<any>([]);
  // likeCount default 0으로 바꾸기.
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const showLikeHandler = () => {
    handleOpen();
  };
  const logoutHandler = () => {
    handleCloseUserMenu();
    // ethereum.on('disconnect',handler: (error: ProviderRpcError) => void);
    setIsLogin(false);
    navigate("/login");
  };

  const goMyPageHandler = () => {
    handleCloseUserMenu();
    // return <Navigate to="/mypage" />
    navigate("/mypage");
  };
  useEffect(() => {
    (async function () {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const likeFundingsList: any = await fetchLikeFundingLists(currentUserId);
      setLikeFundings(likeFundingsList);
      setLikeCount(likeFundingsList.length);
      await getMyNfts(accounts[0]).then((info) => {
        let temp: any[] = [{}];
        for (let nftImage of info.data.nft) {
          temp.push(nftImage.nftAddress);
        }
        setProfileImg(temp);
        setIsCurrentProfileImage(
          `https://${temp[info.data.user.profileImage]}`
        );
      });
    })();
  }, [isNavLikeChange, currentUserId, isCurrentProfileImage]);

  return (
    <>
      <AppBar
        // position="static"

        position="sticky"
        sx={{
          backgroundColor: "white",
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className={styles.navbar}>
            <div>
              <Link to="/">
                <img
                  src="/Assets/farmer_1.png"
                  alt=""
                  className={styles.navbar__logo}
                />
              </Link>
              <Typography
                // variant="h5"
                // noWrap
                component="a"
                href="/"
                sx={{
                  // ml: 1,
                  // display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  // fontFamily: "monospace",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: ".2rem",
                  color: mainGreen,
                  textDecoration: "none",
                  my: "auto",
                }}
              >
                FARMDING
              </Typography>
              <Typography
                // variant="h5"
                // noWrap
                component="a"
                href="/nft"
                sx={{
                  // ml: 1,
                  // display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  // fontFamily: "monospace",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: ".2rem",
                  color: mainPink,
                  textDecoration: "none",
                  ml: "15px",
                  my: "auto",
                  "&:hover": {
                    color: "#ec2c48",
                  },
                }}
              >
                NFTs
              </Typography>
            </div>
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                // aria-describedby="modal-modal-description"
              >
                <LikeFundings modalCloseHandler={handleClose} />
              </Modal>

              <IconButton onClick={showLikeHandler} sx={{ p: 1, mr: 3 }}>
                <StyledBadge
                  // badgeContent={4}
                  badgeContent={likeCount}
                  // badgeContent={likeFundings.length}
                >
                  <FavoriteIcon
                    sx={{ color: mainGreen, width: "40px", height: "40px" }}
                  />
                </StyledBadge>
              </IconButton>
              <Box sx={{ flexGrow: 0 }}>
                <div onClick={handleOpenUserMenu} className={styles.avatar}>
                  <Avatar
                    // src="/Assets/grape.png"
                    src={profileImg.length === 1 ? "" : isCurrentProfileImage}
                    sx={{ width: 53, height: 53, mr: 4 }}
                  />
                </div>
                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p:0 }}>
                </IconButton> */}
                <Menu
                  sx={{ mt: "55px" }}
                  id="menu-navbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={goMyPageHandler} sx={{ px: 3, py: 2 }}>
                    <Typography textAlign="center">MY PAGE</Typography>
                  </MenuItem>
                  {/* <Link 
                  // to={`/profile/${currentUser.id}`} 
                  to="#" 
                  className={styles.link}
                  >
                  </Link> */}
                  <MenuItem onClick={logoutHandler} sx={{ px: 3, py: 2 }}>
                    <Typography textAlign="center">LOGOUT</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;

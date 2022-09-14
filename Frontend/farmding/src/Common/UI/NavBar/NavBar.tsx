import { useState } from "react";
// component
import LikeFundings from "./LikeFundings";
// scss
import styles from "./NavBar.module.scss";
// router
import { Link } from "react-router-dom";
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
import Modal from '@mui/material/Modal';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';




const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: '#FF7676',
    color: 'white',
    padding: '9px 6px',
  },
}));


const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  // likeCount default 0으로 바꾸기.
  const [likeCount, setlikeCount] = useState(10);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }; 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const showLikeHandler = ()  => {
    handleOpen();

  };
  const logoutHandler = () => {
    handleCloseUserMenu()
    // dispatch(logout())
    //   .unwrap()
    //   .then(() => {
    //     document.location.href = '/';
    //   });
  };


  return (
    <>
      <AppBar
      // position="static"
      
      position="sticky"
      sx={{
        backgroundColor: 'white',
        py: 1
      }}
      >
        <Container maxWidth="xl" >
          <Toolbar disableGutters className={styles.navbar}>
            <div>
              <Link to="/">
                <img src="/Assets/farmer_1.png" alt="" className={styles.navbar__logo}/>
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
                  color: "#5DAE8B",
                  textDecoration: "none",
                  my: 'auto'
                }}
              >
                FARMDING
              </Typography>
            </div>
          
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                // aria-describedby="modal-modal-description"
              >
                <LikeFundings/>
              </Modal>

              <IconButton onClick={showLikeHandler} 
              sx={{p:1, mr:3}}
              >
                <StyledBadge 
                  // badgeContent={4} 
                  badgeContent={likeCount} 
                >
                  <FavoriteIcon sx={{ color: "#5DAE8B", width:"40px", height:"40px" }}  />
                </StyledBadge>
              </IconButton>
              <Box sx={{ flexGrow: 0 }}>
                <div onClick={handleOpenUserMenu} className={styles.avatar}>
                  <Avatar 
                    // src="/Assets/grape.png"  
                    src={profileImg}  
                    sx={{ width: 53, height: 53, mr:4}}
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
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link 
                  // to={`/profile/${currentUser.id}`} 
                  to="#" 
                  className={styles.link}
                  >
                    <MenuItem onClick={handleCloseUserMenu} sx={{ px: 3, py: 2 }}>
                      <Typography textAlign="center">MY PAGE</Typography>
                    </MenuItem>
                  </Link>
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
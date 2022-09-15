import { Avatar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import styles from "./MyPage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import MyProject from "./MyProject";
import MyNFT from "./MyNFT";
const MyPage = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
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
          />
          <Box sx={{ width: "100%", marginLeft: "2rem" }}>
            <Box sx={{ display: "flex", margin: "0.8rem 0" }}>
              <Typography
                sx={{ color: "#5DAE8B", fontSize: "2rem", fontWeight: "bold" }}
              >
                nickname
              </Typography>
              <EditIcon sx={{ margin: "auto 1rem", cursor: "pointer" }} />
            </Box>
            <Typography sx={{ margin: "1rem 0" }}>안녕하세요</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{ color: "#5DAE8B", fontWeight: "bold", margin: "auto 0" }}
              >{`배송지주소 : `}</Typography>
              <Button variant="contained" color="error">
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
      </Box>
    </>
  );
};
export default MyPage;

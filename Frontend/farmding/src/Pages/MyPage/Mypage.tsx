import { Avatar, Box, Button, Typography } from "@mui/material";
import styles from "./MyPage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
const MyPage = () => {
  return (
    <>
      <Box
        sx={{
          width: "70rem",
          backgroundColor: "red",
          margin: "auto",
          marginTop: "5rem",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar sx={{ width: "10rem", height: "10rem" }} />
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex" }}>
              <Typography>This is nickname</Typography>
              <EditIcon />
            </Box>
            <Typography>안녕하세요</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>{`배송지주소 : ~~~~~~~~~~~~~~~~~~~~~`}</Typography>
              <Button>배송지 변경</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default MyPage;

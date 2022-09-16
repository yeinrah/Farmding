import { Box, Button, TextField, Typography } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
const UserInfoUpdate = () => {
  return (
    <>
      <Box
        sx={{
          ...modalStyle,
          width: 500,
          height: 500,
          overflow: "auto",
          backgroundColor: "#F6F49D",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>배송 주소</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", margin: "1.6rem 0" }}>
            <TextField label="우편번호"></TextField>
            <Button
              sx={{
                backgroundColor: "#5DAE8B",
                color: "#fff",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#5DAE8B",
                },
              }}
            >
              우편 번호 찾기
            </Button>
          </Box>
          <TextField
            label="도로명 주소"
            sx={{ margin: "1.6rem 0" }}
          ></TextField>
          <TextField label="지번 주소" sx={{ margin: "1.6rem 0" }}></TextField>
          <TextField label="상세 주소" sx={{ margin: "1.6rem 0" }}></TextField>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            sx={{
              backgroundColor: "#5DAE8B",
              color: "#fff",
              "&:hover": {
                color: "#fff",
                backgroundColor: "#5DAE8B",
              },
            }}
          >
            확인
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default UserInfoUpdate;

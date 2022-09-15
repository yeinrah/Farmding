import { Box, Button, Typography } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";

const SuccessModal = () => {
  return (
    <Box
      sx={{
        ...modalStyle,
        width: 300,
        height: 100,
        overflow: "auto",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          fontSize: "20px",
        }}
      >
        구매에 성공했습니다.
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button variant="contained" color="success" size="large">
          확인
        </Button>
      </Box>
    </Box>
  );
};
export default SuccessModal;

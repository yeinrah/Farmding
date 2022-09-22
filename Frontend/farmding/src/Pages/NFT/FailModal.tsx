import { Box, Button, Typography } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";

const FailModal = () => {
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
        구매에 실패했습니다.
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button variant="contained" color="success" size="large">
          실패
        </Button>
      </Box>
    </Box>
  );
};
export default FailModal;

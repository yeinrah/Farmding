import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { modalStyle } from "../../Common/data/Style";

const UpdateNFTPrice = () => {
  return (
    <>
      <Box
        sx={{
          ...modalStyle,
          width: 400,
          height: 130,
          overflow: "auto",
          backgroundColor: "#F6F49D",
        }}
      >
        <Box sx={{ fontWeight: "bold" }}>원하는 가격을 설정하세요</Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}
        >
          <TextField></TextField>
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
export default UpdateNFTPrice;

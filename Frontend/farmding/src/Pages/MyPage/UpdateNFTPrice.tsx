import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { changePrice } from "../../Common/API/NFTApi";
import { modalStyle } from "../../Common/data/Style";

const UpdateNFTPrice = (props: any) => {
  const [inputPrice, setInputPrice] = useState(props.currentPrice);
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
          <TextField
            onChange={(v) => {
              setInputPrice(v.target.value);
            }}
          ></TextField>
          <Button
            sx={{
              backgroundColor: "#5DAE8B",
              color: "#fff",
              "&:hover": {
                color: "#fff",
                backgroundColor: "#5DAE8B",
              },
            }}
            onClick={() => {
              changePrice(inputPrice, props.nftId);
              props.changePrice(inputPrice);
              props.onClose();
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

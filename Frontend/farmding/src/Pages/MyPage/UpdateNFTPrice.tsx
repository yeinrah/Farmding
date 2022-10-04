import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { changePrice } from "../../Common/API/NFTApi";
import { modalStyle } from "../../Common/data/Style";

const UpdateNFTPrice = (props: any) => {
  const [inputPrice, setInputPrice] = useState<number>(props.currentPrice);
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
              setInputPrice(Number(v.target.value));
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
              if (!inputPrice) {
                alert("숫자만 입력 가능합니다.");
                return;
              }
              if (inputPrice < 0) {
                alert("가격은 0이상이어야 합니다.");
                return;
              }
              if (props.isSelling) {
                alert("판매 중에는 가격을 변경할 수 없습니다.");
                return;
              }
              changePrice(inputPrice, props.count);
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

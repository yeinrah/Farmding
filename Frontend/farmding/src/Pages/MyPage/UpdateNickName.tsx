import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import { useState } from "react";
import { changeMyNickNamePr } from "../../Common/API/userApi";
import { modalStyle } from "../../Common/data/Style";

const UpdateNickName = ({ handleClose, changeInfo, userInfo }: any) => {
  const [nowNickname, setNowNickname] = useState("");
  const [nowPr, setNowPr] = useState("");
  const { ethereum } = window;
  return (
    <>
      <Box
        sx={{
          ...modalStyle,
          width: 300,
          height: 300,
          overflow: "auto",
          backgroundColor: "#F6F49D",
        }}
      >
        <Box sx={{ fontWeight: "bold" }}>소개를 작성하세요</Box>
        <Box sx={{ display: "flex", margin: "2rem 0" }}>
          <TextField
            label="닉네임"
            onChange={(v) => {
              setNowNickname(v.target.value);
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
          >
            check
          </Button>
        </Box>
        <Box sx={{ display: "flex", margin: "2rem 0" }}>
          <TextField
            label="자기소개"
            onChange={(v) => {
              setNowPr(v.target.value);
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
          >
            check
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#5DAE8B",
              color: "#fff",
              width: "100px",
              height: "50px",
              "&:hover": {
                color: "#fff",
                backgroundColor: "#5DAE8B",
              },
            }}
            onClick={async () => {
              const accounts = await ethereum.request({
                method: "eth_requestAccounts",
              });
              changeMyNickNamePr(accounts[0], nowNickname, nowPr);
              changeInfo({ ...userInfo, nickname: nowNickname, UserPr: nowPr });
              handleClose();
            }}
          >
            확인
          </Button>
        </Box>
        {/* <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="Minimum 3 rows"
          style={{ width: 200 }}
        /> */}
      </Box>
    </>
  );
};
export default UpdateNickName;

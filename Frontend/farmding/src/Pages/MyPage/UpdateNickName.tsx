import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import { useState } from "react";
import {
  changeMyNickNamePr,
  userNicknameExistCheck,
} from "../../Common/API/userApi";
import { modalStyle } from "../../Common/data/Style";

const UpdateNickName = ({ handleClose, changeInfo, userInfo }: any) => {
  const [nowNickname, setNowNickname] = useState(userInfo.nickname);
  const [nowPr, setNowPr] = useState(userInfo.userPr);
  const [nameDuplicateCheck, setNameDuplicateCheck] = useState(false);
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
            value={nowNickname}
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
            onClick={async () => {
              if (await (await userNicknameExistCheck(nowNickname)).data) {
                alert("이미 존재하는 닉네임 입니다.");
                setNameDuplicateCheck(false);
              } else {
                alert("사용 가능한 닉네임 입니다.");
                setNameDuplicateCheck(true);
              }
            }}
          >
            중복확인
          </Button>
        </Box>
        <Box sx={{ display: "flex", margin: "2rem 0" }}>
          <TextField
            label="자기소개"
            value={nowPr}
            onChange={(v) => {
              setNowPr(v.target.value);
            }}
            sx={{ width: "100%" }}
          ></TextField>
          {/* <Button
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
          </Button> */}
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
              if (nowNickname.length === 0 || nowNickname.length >= 50) {
                alert("닉네임은 1~50길이만 허용됩니다.");
                return;
              }
              if (!nameDuplicateCheck && nowNickname !== userInfo.nickname) {
                alert("닉네임 중복 체크를 해주세요");
                return;
              }
              const accounts = await ethereum.request({
                method: "eth_requestAccounts",
              });
              changeMyNickNamePr(nowNickname, nowPr, accounts[0]);
              changeInfo({ ...userInfo, nickname: nowNickname, userPr: nowPr });
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

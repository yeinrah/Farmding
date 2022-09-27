import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

const SignUp = () => {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("주소 검색");
  const [addressDetail, setAddressDetail] = useState("상세주소");
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={{ display: "flex", margin: "100px" }}>
          {openPostcode && (
            <DaumPostcode
              onComplete={(data) => {
                setAddress(data.address);
                setOpen(false);
              }} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery="언주로 508" // 팝업을 열때 기본적으로 입력되는 검색어
            />
          )}
        </Box>
        {/* <div>ha</div> */}
      </Modal>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "50vw",
          borderRadius: "10px",
          marginTop: "10vh",
          background: "#F6F49D",
        }}
      >
        <Box sx={{ margin: "30px", fontWeight: "bold", width: "100%" }}>
          <Box sx={{ fontSize: "25px", marginBottom: "30px" }}>
            회원 정보 등록
          </Box>
          <Typography sx={{ color: "#595A66" }}>닉네임</Typography>
          <Box sx={{ display: "flex", margin: "1rem 0" }}>
            <TextField sx={{ width: "60%" }} label="닉네임"></TextField>
            <Button
              sx={{
                backgroundColor: "#5DAE8B",
                width: "30%",
                marginLeft: "10%",
                color: "#fff",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#5DAE8B",
                },
              }}
            >
              중복확인
            </Button>
          </Box>
          <Typography sx={{ color: "#595A66" }}>전화번호</Typography>
          <Box sx={{ display: "flex", margin: "1rem 0" }}>
            <TextField sx={{ width: "60%" }} label="전화번호"></TextField>
          </Box>
          <Typography sx={{ color: "#595A66" }}>배송주소</Typography>
          <Box sx={{ display: "flex", margin: "1rem 0" }}>
            <TextField
              sx={{ width: "60%" }}
              disabled
              value={address}
            ></TextField>
            <Button
              sx={{
                backgroundColor: "#5DAE8B",
                width: "30%",
                marginLeft: "10%",
                color: "#fff",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#5DAE8B",
                },
              }}
              onClick={() => {
                setOpenPostcode(true);
                setOpen(true);
              }}
            >
              주소검색
            </Button>
          </Box>
          <Box sx={{ display: "flex", margin: "1rem 0" }}>
            <TextField
              sx={{ width: "100%" }}
              label="상세주소"
              onChange={(v) => {
                setAddressDetail(v.target.value);
              }}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                backgroundColor: "#5DAE8B",
                width: "30%",
                marginTop: "10px",
                color: "#fff",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#5DAE8B",
                },
              }}
            >
              회원 가입
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SignUp;

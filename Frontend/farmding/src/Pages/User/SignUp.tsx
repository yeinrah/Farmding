import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { url } from "inspector";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { userNicknameExistCheck, userSignUp } from "../../Common/API/userApi";
import { modalStyle } from "../../Common/data/Style";
import { loginState } from "../../Recoil/atoms/auth";
const SignUp = () => {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameDuplicateCheck, setNameDuplicateCheck] = useState(false);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("상세주소");
  const handleClose = () => {
    setOpen(false);
  };
  const { ethereum } = window;
  const navigate = useNavigate();
  const signup = async () => {
    if (!nameDuplicateCheck) {
      Swal.fire({
        icon: "error",
        title: "닉네임 중복체크를 해주세요.",
      });
      return;
    }
    if (phoneNumber.length !== 11) {
      Swal.fire({
        icon: "error",
        title: "전화번호는 11자리 입니다.",
      });
      return;
    }
    if (address.length === 0) {
      Swal.fire({
        icon: "error",
        title: "주소를 입력해주세요.",
      });
      return;
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    userSignUp(address, nickname, phoneNumber, accounts[0])
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "회원가입 완료",
        });
        setIsLogin(true);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "회원가입 실패",
        });
      });
  };
  const nicknameCheck = async () => {
    const result = await userNicknameExistCheck(nickname);
    if (!result.data) {
      Swal.fire({
        icon: "success",
        title: "사용 가능한 닉네임 입니다.",
      });
      setNameDuplicateCheck(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "사용 불가능한 닉네임 입니다.",
      });
      setNameDuplicateCheck(false);
    }
  };
  return (
    <Box
      sx={{
        backgroundImage: `url("/Assets/signup_background.png")`,
        backgroundSize: `1000px`,
        height: `100vh`,
      }}
    >
      <Box
        // sx={{ display: "flex", justifyContent: "center" }}
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          // aria-describedby="modal-modal-description"
        >
          {/* <Box sx={{ display: "absolute", width: 500 }}> */}
          <Box sx={{ ...modalStyle, width: 600, height: 400 }}>
            {openPostcode && (
              <DaumPostcode
                onComplete={(data) => {
                  setAddress(data.address);
                  setOpen(false);
                }} // 값을 선택할 경우 실행되는 이벤트
                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                // defaultQuery="언주로 508" // 팝업을 열때 기본적으로 입력되는 검색어
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
            boxShadow: 24,
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
              <TextField
                color="success"
                sx={{ width: "60%" }}
                // label="닉네임"
                placeholder="닉네임"
                onChange={(v) => {
                  setNickname(v.target.value);
                }}
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
                onClick={nicknameCheck}
              >
                중복확인
              </Button>
            </Box>
            <Typography sx={{ color: "#595A66" }}>전화번호</Typography>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
              <TextField
                color="success"
                sx={{ width: "60%" }}
                placeholder="01012345678"
                onChange={(v) => {
                  setPhoneNumber(v.target.value);
                }}
              ></TextField>
            </Box>
            <Typography sx={{ color: "#595A66" }}>배송주소</Typography>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
              <TextField
                sx={{ width: "60%" }}
                placeholder="주소"
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
                주소 검색
              </Button>
            </Box>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
              <TextField
                sx={{ width: "100%" }}
                placeholder="상세주소"
                color="success"
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
                onClick={signup}
              >
                회원 가입
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SignUp;

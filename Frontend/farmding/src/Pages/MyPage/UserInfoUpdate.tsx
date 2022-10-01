import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";
import { changeMyAddress } from "../../Common/API/userApi";
const UserInfoUpdate = ({ handleClose1, userInfo, changeAddress }: any) => {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("상세주소");
  const { ethereum } = window;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
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
          ...modalStyle,
          width: 500,
          overflow: "auto",
          backgroundColor: "#F6F49D",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>배송 주소</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", margin: "1.6rem 0" }}>
            <TextField label="주소" value={address} disabled></TextField>
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
                console.log(userInfo.address.split(" "));
                setOpenPostcode(true);
                setOpen(true);
              }}
            >
              주소 찾기
            </Button>
          </Box>
          <TextField
            label="상세 주소"
            sx={{ margin: "1.6rem 0" }}
            onChange={(v) => {
              setAddressDetail(v.target.value);
            }}
          ></TextField>
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
            onClick={async () => {
              if (address.length === 0) {
                alert("주소를 입력해주세요");
                return;
              }
              const accounts = await ethereum.request({
                method: "eth_requestAccounts",
              });
              changeMyAddress(accounts[0], `${address} ${addressDetail}`);
              changeAddress({
                ...userInfo,
                address: `${address} ${addressDetail}`,
              });
              handleClose1();
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

import { Avatar, Box, Typography } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";
import profileImages from "../../Assets/profile/profileImages";
import { changeMyProfile } from "../../Common/API/userApi";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentProfileImageState } from "../../Recoil/atoms/account";
const UpdateProfileImg = ({
  handleClose,
  changeProfile,
  userInfo,
  myProfile,
}: any) => {
  const [isCurrentProfileImage, setIsCurrentProfileImage] =
    useRecoilState<string>(currentProfileImageState);
  const { ethereum } = window;
  useEffect(() => {
    console.log(myProfile + "hha");
  }, []);
  return (
    <>
      <Box
        sx={{
          ...modalStyle,
          width: 400,
          height: 400,
          overflow: "auto",
          backgroundColor: "#F6F49D",
        }}
      >
        <Typography sx={{ mb: 3, fontSize: 25 }}>
          프로필 이미지를 골라주세요.
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {myProfile &&
            myProfile.map((element: any, index: number) => (
              <Box
                sx={{
                  borderRadius: "20px",
                  "&:hover": {
                    opacity: "60%",
                  },
                }}
              >
                <Avatar
                  onClick={async () => {
                    const accounts = await ethereum.request({
                      method: "eth_requestAccounts",
                    });
                    changeMyProfile(accounts[0], index);
                    changeProfile({ ...userInfo, profileImage: index });
                    setIsCurrentProfileImage(`https://${myProfile[index]}`);
                    handleClose();
                  }}
                  sx={{
                    width: "100px",
                    height: "100px",
                    cursor: "pointer",
                    // borderRadius: "50px",
                    margin: "10px",
                  }}
                  src={index === 0 ? "" : `https://${myProfile[index]}`}
                />
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};
export default UpdateProfileImg;

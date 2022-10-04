import { Box } from "@mui/material";
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
          width: 500,
          height: 430,
          overflow: "auto",
          backgroundColor: "#F6F49D",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          {myProfile &&
            myProfile.map((element: any, index: number) => (
              <Box
                sx={{
                  borderRadius: "25px",
                  "&:hover": {
                    opacity: "60%",
                  },
                }}
              >
                <img
                  src={
                    index === 0
                      ? process.env.PUBLIC_URL + "/Assets/defaultProfile.png"
                      : `https://${myProfile[index]}`
                  }
                  alt="images"
                  style={{
                    width: "90px",
                    height: "80px",
                    cursor: "pointer",
                    borderRadius: "25px",
                  }}
                  onClick={async () => {
                    const accounts = await ethereum.request({
                      method: "eth_requestAccounts",
                    });
                    changeMyProfile(accounts[0], index);
                    changeProfile({ ...userInfo, profileImage: index });
                    setIsCurrentProfileImage(`https://${myProfile[index]}`);
                    handleClose();
                  }}
                />
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};
export default UpdateProfileImg;

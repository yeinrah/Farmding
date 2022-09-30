import { Box } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";
import profileImages from "../../Assets/profile/profileImages";
import { changeMyProfile } from "../../Common/API/userApi";
import { useState } from "react";
const UpdateProfileImg = ({ handleClose, changeProfile, userInfo }: any) => {
  const { ethereum } = window;
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
          {profileImages.map((element, index) => (
            <Box>
              <img
                src={profileImages[index]}
                alt="images"
                style={{ width: "90px", height: "80px", cursor: "pointer" }}
                onClick={async () => {
                  const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                  });
                  changeMyProfile(accounts[0], index);
                  changeProfile({ ...userInfo, profileImage: index });
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

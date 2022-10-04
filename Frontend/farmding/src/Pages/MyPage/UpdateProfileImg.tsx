import { Box } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";
import profileImages from "../../Assets/profile/profileImages";
import { changeMyProfile } from "../../Common/API/userApi";
import { useEffect, useState } from "react";
const UpdateProfileImg = ({
  handleClose,
  changeProfile,
  userInfo,
  myProfile,
}: any) => {
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
          {!myProfile && <div>NFT가 없어요 ㅎ</div>}
          {myProfile &&
            myProfile.map((element: any, index: number) => (
              <Box>
                <img
                  src={`https://${myProfile[index]}`}
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

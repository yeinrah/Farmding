import { Box } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";
import profileImages from "../../Assets/profile/profileImages";
const UpdateProfileImg = () => {
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
              />
            </Box>
            // <div>ha!!!!!!!!!!!!!!1123</div>
          ))}
        </Box>
      </Box>
    </>
  );
};
export default UpdateProfileImg;

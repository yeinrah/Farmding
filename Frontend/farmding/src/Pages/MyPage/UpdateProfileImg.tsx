import { Box } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";

const UpdateProfileImg = () => {
  return (
    <>
      <Box
        sx={{
          ...modalStyle,
          width: 500,
          height: 500,
          overflow: "auto",
          backgroundColor: "#F6F49D",
        }}
      ></Box>
    </>
  );
};
export default UpdateProfileImg;

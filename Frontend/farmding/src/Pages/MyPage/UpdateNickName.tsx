import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import { modalStyle } from "../../Common/data/Style";

const UpdateNickName = () => {
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
          <TextField label="닉네임"></TextField>
          <Button
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
          </Button>
        </Box>
        <Box sx={{ display: "flex", margin: "2rem 0" }}>
          <TextField label="자기소개"></TextField>
          <Button
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
          </Button>
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

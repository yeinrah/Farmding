import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./MyProject.module.scss";
const MyProject = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem 2rem",
          width: "100%",
        }}
      >
        <Card sx={{ width: 400, marginLeft: "10%" }}>
          <CardMedia
            component="img"
            alt=""
            height="60%"
            image={`/Assets/${"grape.png"}`}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="div"
              sx={{ fontWeight: 800 }}
            >
              {"올해의 마지막 포도"}
            </Typography>
            <div className={styles.heartArea}>
              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                {"farm"}
              </Typography>
              <div>
                <FavoriteBorderIcon sx={{ color: "green" }} fontSize="small" />
                <span className={styles.like}>{5}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          sx={{ margin: "0 5rem", width: "900px", backgroundColor: "gray" }}
        >
          <Box sx={{ display: "flex", margin: "1rem 0" }}>
            <Typography sx={{ marginLeft: "10px" }}>총 펀딩 금액</Typography>
            <Typography sx={{ margin: "0rem 0 0rem 60%" }}>250 SSF</Typography>
          </Box>
          <Box sx={{ display: "flex", margin: "1rem 0" }}>
            <Typography sx={{ marginLeft: "10px" }}>
              제일 맛있는 영동포도 4kg
            </Typography>
            <Typography sx={{ margin: "0rem 0 0rem 40%" }}>
              수량: 1개
            </Typography>
          </Box>
          <Box sx={{ margin: "3rem 0 1rem 0" }}>
            <Typography sx={{ marginLeft: "10px" }}>배송비 10SSF</Typography>
            <Typography sx={{ marginLeft: "10px" }}>
              배송예정일: 2022년 9월 16일 예정
            </Typography>
          </Box>
        </Card>
      </Box>
      <hr />
    </>
  );
};
export default MyProject;

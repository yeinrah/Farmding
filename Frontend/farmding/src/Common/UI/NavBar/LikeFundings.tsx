
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// scss
import styles from "./LikeFundings.module.scss";

//mui

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// data
import { modalStyle } from "../../data/Style";
import { cutLongTitle } from "../../functions/CutLongTitle";

export interface ILikeFundingsProps {

}

const dummyLikeProjects = [
  {
    title: "올해의 마지막 제주감귤",
    mainImg: "grape.png",
    farm: "정서농장",
    likeCnt: 5,
  },
  {
    title: "올해의 마지막 제주포도",
    mainImg: "grape.png",
    farm: "상훈농장",
    likeCnt: 4,
  },
  {
    title: "올해의 마지막 제주오렌지",
    mainImg: "grape.png",
    farm: "예인농장",
    likeCnt: 3,
  },
  {
    title: "올해의 마지막 제주아보카도",
    mainImg: "grape.png",
    farm: "은민농장",
    likeCnt: 2,
  },
  {
    title: "올해의 마지막 제주복숭아",
    mainImg: "grape.png",
    farm: "영진농장",
    likeCnt: 1,
  },
  {
    title: "올해의 마지막 제주복숭아",
    mainImg: "grape.png",
    farm: "영진농장",
    likeCnt: 1,
  },
];

const LikeFundingsModal = (props: ILikeFundingsProps) => {
  const [likeFundings, setLikeFundings] = useState([]);
  const navigate = useNavigate();
  const moveDetailHandler = () => {
    navigate('/project')
    // 모달 close 하는 함수 호출
  }

  return (
    <Box sx={{...modalStyle, width: 530, height: 500, overflow: 'auto'}}>
      <Typography id="modal-title" 
        variant="h5" component="h2"
        fontWeight= 'bold'
        color = '#5DAE8B'
        sx={{ mb: 3}}
      >
        좋아하는 프로젝트
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }} className={styles.container}>
        {dummyLikeProjects.map((pjt, idx) => (
          // <ProjectItem key={idx} title={pjt.title} />
          <Grid item xs={4} key={idx}>
            <Card sx={{ height: 160 }}
              className={styles.card}
              onClick={moveDetailHandler}
            >
              <CardMedia
                component="img"
                alt=""
                height="90"
                image={`/Assets/${pjt.mainImg}`}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle2" component="div"
                  sx={{fontWeight: 800}}
                >
                  {cutLongTitle(pjt.title, 8)}
                </Typography>
                <div className={styles.heartArea}>
                  <Typography color="text.secondary"
                    sx={{fontSize: 13}}
                  >
                    {pjt.farm}
                  </Typography>
                  <div>
                    <FavoriteBorderIcon sx={{ color: "green" }} 
                      fontSize="small"
                    />
                    <span className={styles.like}>{pjt.likeCnt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <Typography id="modal-projects" sx={{ mt: 2 }}>
        프로젝트 목록
      </Typography> */}
    </Box>
  );
}
export default LikeFundingsModal;
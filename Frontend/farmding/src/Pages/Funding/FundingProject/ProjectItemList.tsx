import React from "react";
// scss
import styles from "./ProjectItemList.module.scss";
// mui
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import ProjectItem from "./ProjectItem";

const ProjectItemList = () => {
  const projects = [
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

  return (
    <Grid container spacing={{ xs: 4, md: 5 }} className={styles.container}>
      {projects.map((pjt, idx) => (
        // <ProjectItem key={idx} title={pjt.title} />
        <Grid item xs={6} sm={4} md={3} key={idx}>
          <Card sx={{ height: 320 }}>
            <CardMedia
              component="img"
              alt=""
              height="170"
              image={`/Assets/${pjt.mainImg}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {pjt.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pjt.farm}
              </Typography>
              <div className={styles.heartArea}>
                <FavoriteBorderIcon sx={{ color: "green" }} />
                <span className={styles.like}>{pjt.likeCnt}</span>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    // <Box sx={{ flexGrow: 1 }}>
    // </Box>
  );
};
export default ProjectItemList;

import React from "react";
// scss
import styles from "./ProjectItemList.module.scss";
// mui
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import ProjectItem from "./ProjectItem";
import FundingRanking from "../FundingRanking/FundingRanking";
import { Padding } from "@mui/icons-material";

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
  const cutLongTitle = (title: string) => {
    if (title.length > 12) return title.slice(0, 12) + "...";
    return title;
  };
  return (
    <div className={styles.projectMainBox}>
      <Grid container spacing={{ xs: 4, md: 5 }} className={styles.container}>
        {projects.map((pjt, idx) => (
          // <ProjectItem key={idx} title={pjt.title} />
          <Grid item xs={6} sm={8} md={3} key={idx}>
            <Card sx={{ height: 270 }}>
              <CardMedia
                component="img"
                alt=""
                height="170"
                image={`/Assets/${pjt.mainImg}`}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {cutLongTitle(pjt.title)}
                </Typography>
                <div className={styles.heartArea}>
                  <Typography variant="body2" color="text.secondary">
                    {pjt.farm}
                  </Typography>
                  <div>
                    <FavoriteBorderIcon sx={{ color: "green" }} />
                    <span className={styles.like}>{pjt.likeCnt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <FundingRanking />
    </div>
    // <Box sx={{ flexGrow: 1 }}>
    // </Box>
  );
};
export default ProjectItemList;

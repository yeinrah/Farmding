import { useEffect, useState } from "react";
import FundingRanking from "../FundingRanking/FundingRanking";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router-dom";
// scss
import styles from "./ProjectItemList.module.scss";
// mui
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Padding } from "@mui/icons-material";

import { cutLongTitle } from "../../../Common/functions/CutLongTitle";
import { mainGreen } from "../../../Common/data/Style";
import { fetchPopularProjects } from "../../../Common/API/fundingAPI";

export interface IPjt {
  projectId: number;
  projectTitle: string;
  farmerName: string;
  likeAmount: number;
}

const ProjectItemList = () => {
  const [popularProjects, setPopularProjects] = useState([]);
  const navigate = useNavigate();
  const moveDetailHandler = (pjtId: number) => {
    navigate(`/project/${pjtId}`);
  };

  useEffect(() => {
    (async function () {
      const popularPjts: any = await fetchPopularProjects();
      setPopularProjects(popularPjts);
    })();
  }, []);

  return (
    <div className={styles.projectMainBox}>
      <Grid container spacing={{ xs: 4, md: 5 }} className={styles.container}>
        {popularProjects.map((pjt: IPjt, idx) => (
          // <ProjectItem key={idx} title={pjt.title} />
          <Grid item xs={6} sm={8} md={3} key={idx}>
            <Card
              sx={{ height: 270 }}
              className={styles.card}
              onClick={() => moveDetailHandler(pjt.projectId)}
            >
              <CardMedia
                component="img"
                alt=""
                height="170"
                image={`/Assets/funding/${pjt.projectId}.jpg`}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: 800 }}
                >
                  {cutLongTitle(pjt.projectTitle, 12)}
                </Typography>
                <div className={styles.heartArea}>
                  <Typography variant="body2" color="text.secondary">
                    {pjt.farmerName}
                  </Typography>
                  <div>
                    <FavoriteBorderIcon sx={{ color: mainGreen }} />
                    <span className={styles.like}>{pjt.likeAmount}</span>
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

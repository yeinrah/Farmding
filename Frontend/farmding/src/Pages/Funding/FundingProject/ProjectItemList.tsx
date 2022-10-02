import { useEffect, useState } from "react";
import FundingRanking from "../FundingRanking/FundingRanking";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router-dom";
// scss
import styles from "./ProjectItemList.module.scss";
// mui
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Padding } from "@mui/icons-material";

import { cutLongTitle } from "../../../Common/functions/CutLongTitle";
import { mainGreen } from "../../../Common/data/Style";
import {
  fetchAllProjects,
  fetchPopularProjects,
} from "../../../Common/API/fundingAPI";
import SearchBar from "../../../Common/UI/SearchBar/SearchBar";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

export interface IPjt {
  projectId: number;
  projectTitle: string;
  farmerName: string;
  likeAmount: number;
}

const ProjectItemList = () => {
  const [nowProjects, setNowProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [nowSearch, setNowSearch] = useState("");
  const navigate = useNavigate();
  const moveDetailHandler = (pjtId: number) => {
    navigate(`/project/${pjtId}`);
  };
  const fetchProjects = async () => {
    const popularPjts: any = await fetchPopularProjects();
    setNowProjects(popularPjts);
  };
  const fetchAnyProjects = async () => {
    const popularPjts: any = await fetchAllProjects();
    setAllProjects(popularPjts);
  };
  const search = async () => {
    if (nowSearch.length !== 0) {
      let temp: any = [];
      temp = allProjects.filter((item: any) => {
        return item.projectTitle.includes(nowSearch);
      });
      setNowProjects(temp);
    }
  };
  useEffect(() => {
    fetchProjects();
    fetchAnyProjects();
  }, []);

  useEffect(() => {
    search();
  }, [nowSearch]);
  return (
    <div className={styles.projectMainBox}>
      <Grid container spacing={{ xs: 4, md: 5 }} className={styles.container}>
        <div
          className={styles.searchBar}
          defaultValue={nowSearch}
          onKeyDown={(v: any) => {
            if (v.key === "Enter") {
              setNowSearch(v.target.value);
            }
          }}
        >
          <SearchBar placeHolder={"어떤 과일을 드시고 싶으세요?"} />
        </div>
        {nowProjects.map((pjt: IPjt, idx) => (
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

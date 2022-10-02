import { useEffect, useState } from "react";
import FundingRanking from "../FundingRanking/FundingRanking";
import ProjectItem from "./ProjectItem";
// scss
import styles from "./ProjectItemList.module.scss";
// mui
import { Grid } from "@mui/material";

import { fetchPopularProjects } from "../../../Common/API/fundingAPI";
import {
  dislike,
  getLikeOrNot,
  like,
} from "../../../Common/API/likeFundingAPI";
import { currentUserIdState } from "../../../Recoil/atoms/account";
import { useRecoilState } from "recoil";

export interface IPjtListItem {
  projectId: number;
  projectTitle: string;
  farmerName: string;
  // likeAmount: number;
}
const ProjectItemList = () => {
  const [popularProjects, setPopularProjects] = useState([]);

  // const dislikeHandler = async (projtId: number) => {
  //   await dislike(projtId, currentUserId);
  //   setIsLiked(false);
  // };
  // const likeHandler = async (projtId: number) => {
  //   await like(projtId, currentUserId);
  //   setIsLiked(true);
  // };

  useEffect(() => {
    (async function () {
      const popularPjts: any = await fetchPopularProjects();
      setPopularProjects(popularPjts);
      // const likeOrNot = await getLikeOrNot(projtId, currentUserId);
      // likeOrNot ? setIsLiked(true) : setIsLiked(false);
      // const projtDetail: any = await fetchProjectDetail(projtId);
      // setLikeCnt(projtDetail.likeAmount);
    })();
  }, []);

  return (
    <div className={styles.projectMainBox}>
      <Grid container spacing={{ xs: 4, md: 5 }} className={styles.container}>
        {popularProjects.map((pjt: IPjtListItem, idx) => (
          <Grid item xs={6} sm={8} md={3} key={idx}>
            <ProjectItem
              pjtId={pjt.projectId}
              pjtTitle={pjt.projectTitle}
              farmerName={pjt.farmerName}
              cardHeight={270}
              imgHeight={170}
              onClickDislike={() => {}}
              onModalClose={() => {}}
              // likeCnt={pjt.likeAmount}
            />
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

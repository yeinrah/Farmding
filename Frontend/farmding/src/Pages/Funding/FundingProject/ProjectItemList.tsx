import { useEffect, useState } from "react";
import FundingRanking from "../FundingRanking/FundingRanking";
import ProjectItem from "./ProjectItem";
// scss
import styles from "./ProjectItemList.module.scss";
// mui
import { Grid } from "@mui/material";

import {
  dislike,
  getLikeOrNot,
  like,
} from "../../../Common/API/likeFundingAPI";
import { currentUserIdState } from "../../../Recoil/atoms/account";
import { useRecoilState } from "recoil";
import { cutLongTitle } from "../../../Common/functions/CutLongTitle";
import { mainGreen } from "../../../Common/data/Style";
import {
  fetchAllProjects,
  fetchPopularProjects,
} from "../../../Common/API/fundingAPI";
import SearchBar from "../../../Common/UI/SearchBar/SearchBar";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { useNavigate } from "react-router-dom";

export interface IPjtListItem {
  projectId: number;
  projectTitle: string;
  farmerName: string;
  // likeAmount: number;
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
        {nowProjects.map((pjt: IPjtListItem, idx) => (
          // <ProjectItem key={idx} title={pjt.title} />
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
      <FundingRanking
        allProjects={allProjects}
        moveDetailHandler={moveDetailHandler}
      />
    </div>
  );
};
export default ProjectItemList;

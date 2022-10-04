import { useEffect, useState } from "react";
import FundingRanking, {
  fundingProject,
} from "../FundingRanking/FundingRanking";
import ProjectItem from "./ProjectItem";
// scss
import styles from "./ProjectItemList.module.scss";
// mui
import { Grid } from "@mui/material";

import {
  fetchAllProjects,
  fetchPopularProjects,
} from "../../../Common/API/fundingAPI";
import SearchBar from "../../../Common/UI/SearchBar/SearchBar";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { useNavigate } from "react-router-dom";
import { cutLongTitle } from "../../../Common/functions/CutLongTitle";
import { navLikeButtonChangeState } from "../../../Recoil/atoms/funding";
import { useRecoilState } from "recoil";
import { isSearchStartState } from "../../../Recoil/atoms/search";

export interface IPjtListItem {
  projectId: number;
  projectTitle: string;
  farmerName: string;
  // likeAmount: number;
}
const ProjectItemList = () => {
  const [isNavLikeChange, setIsNavLikeChange] = useRecoilState<boolean>(
    navLikeButtonChangeState
  );
  const [nowProjects, setNowProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [rankingList, setRankingList] = useState<fundingProject[]>([]);
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
    const allPjts: any = await fetchAllProjects();
    setAllProjects(allPjts);
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
    fetchAnyProjects();
    // const sortedRanking: fundingProject[] = allProjects
    //   .filter((item: any) => item.fundingStatus === "open")
    //   .sort((a: any, b: any) => b.likeAmount - a.likeAmount);

    // setRankingList(sortedRanking);
  }, [isNavLikeChange]);

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
              console.log(v.target.value, "검색 시작");
            }
          }}
        >
          <SearchBar
            placeHolder={"과일 이름을 입력하고 Enter 키를 눌러주세요!"}
          />
        </div>
        {nowProjects &&
          nowProjects.map((pjt: IPjtListItem, idx) => (
            // <ProjectItem key={idx} title={pjt.title} />
            <Grid item xs={6} sm={8} md={3} key={idx}>
              <ProjectItem
                pjtId={pjt.projectId}
                pjtTitle={cutLongTitle(pjt.projectTitle, 12)}
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
        // sortedProjects={rankingList}
        moveDetailHandler={moveDetailHandler}
      />
    </div>
  );
};
export default ProjectItemList;

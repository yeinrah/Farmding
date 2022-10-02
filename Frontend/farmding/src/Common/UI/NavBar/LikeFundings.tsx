import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// scss
import styles from "./LikeFundings.module.scss";

//mui

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// data
import { mainGreen, modalStyle } from "../../data/Style";
import { cutLongTitle } from "../../functions/CutLongTitle";
import { fetchLikeFundingLists } from "../../API/likeFundingAPI";
import { currentUserIdState } from "../../../Recoil/atoms/account";
import { useRecoilState } from "recoil";
import ProjectItem from "../../../Pages/Funding/FundingProject/ProjectItem";

export interface ILikeFundings {
  projectId: number;
  projectTitle: string;
  farmerName: string;
  // likeAmount: number;
}
export interface ILikeFundingsModal {
  modalCloseHandler: () => void;
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

const LikeFundingsModal = ({
  modalCloseHandler = () => {},
}: ILikeFundingsModal) => {
  const [currentUserId, setCurrentUserId] =
    useRecoilState<number>(currentUserIdState);
  const [likeFundings, setLikeFundings] = useState([]);
  const [isLikeChange, setIsLikeChange] = useState(false);
  const disLikeHandler = () => {
    setIsLikeChange(true);
  };

  useEffect(() => {
    // setIsLoading(true);
    (async () => {
      const likeFundingList: any = await fetchLikeFundingLists(currentUserId);
      setLikeFundings(likeFundingList);
      // const likeOrNot = await getLikeOrNot(projtId, currentUserId);
      // likeOrNot ? setIsLiked(true) : setIsLiked(false);
      // const projtDetail: any = await fetchProjectDetail(projtId);
      // setLikeCnt(projtDetail.likeAmount);
      setIsLikeChange(false);
    })();
  }, [isLikeChange]);

  return (
    <Box sx={{ ...modalStyle, width: 680, height: 520 }}>
      <Typography
        id="modal-title"
        variant="h5"
        component="h2"
        fontWeight="bold"
        color={mainGreen}
        sx={{ mb: 3 }}
      >
        좋아하는 프로젝트
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }} className={styles.container}>
        {likeFundings.map((pjt: ILikeFundings, idx) => (
          // <ProjectItem key={idx} title={pjt.title} />
          <Grid item xs={4} key={idx}>
            <ProjectItem
              pjtId={pjt.projectId}
              pjtTitle={pjt.projectTitle}
              farmerName={pjt.farmerName}
              cardHeight={230}
              imgHeight={130}
              onClickDislike={disLikeHandler}
              onModalClose={modalCloseHandler}
            />
          </Grid>
        ))}
      </Grid>
      {/* <Typography id="modal-projects" sx={{ mt: 2 }}>
        프로젝트 목록
      </Typography> */}
    </Box>
  );
};
export default LikeFundingsModal;

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
import { navLikeButtonChangeState } from "../../../Recoil/atoms/funding";

export interface ILikeFundings {
  projectId: number;
  projectTitle: string;
  farmerName: string;
  // likeAmount: number;
}
export interface ILikeFundingsModal {
  modalCloseHandler: () => void;
}

const LikeFundingsModal = ({
  modalCloseHandler = () => {},
}: ILikeFundingsModal) => {
  const [currentUserId, setCurrentUserId] =
    useRecoilState<number>(currentUserIdState);
  const [isNavLikeChange, setIsNavLikeChange] = useRecoilState<boolean>(
    navLikeButtonChangeState
  );
  const [likeFundings, setLikeFundings] = useState([]);
  const [isLikeChange, setIsLikeChange] = useState(false);
  const disLikeHandler = () => {
    setIsLikeChange(true);
    // setIsNavLikeChange(!isNavLikeChange);
  };

  useEffect(() => {
    // setIsLoading(true);
    (async () => {
      const likeFundingList: any = await fetchLikeFundingLists(currentUserId);
      setLikeFundings(likeFundingList);
      setIsLikeChange(false);
    })();
  }, [isNavLikeChange, currentUserId, isLikeChange]);

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
              pjtTitle={cutLongTitle(pjt.projectTitle, 10)}
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

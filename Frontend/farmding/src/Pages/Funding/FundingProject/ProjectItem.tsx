import { useEffect, useState } from "react";
// scss
import styles from "./ProjectItem.module.scss";
// mui
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Padding } from "@mui/icons-material";

import { cutLongTitle } from "../../../Common/functions/CutLongTitle";
import { mainGreen } from "../../../Common/data/Style";
import { fetchProjectDetail } from "../../../Common/API/fundingAPI";
import {
  dislike,
  fetchLikeUsers,
  like,
} from "../../../Common/API/likeFundingAPI";
import { currentUserIdState } from "../../../Recoil/atoms/account";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { navLikeButtonChangeState } from "../../../Recoil/atoms/funding";
import { getLikeOrNot } from "../../../Common/functions/GetLikeOrNot";

export interface IPjt {
  pjtId: number;
  pjtTitle: string;
  farmerName: string;
  cardHeight: number;
  imgHeight: number;
  onClickDislike: () => void;
  onModalClose: () => void;
}

const ProjectItem = ({
  pjtId,
  pjtTitle,
  farmerName,
  cardHeight,
  imgHeight,
  onClickDislike = () => {},
  onModalClose = () => {},
}: IPjt) => {
  const [currentUserId, setCurrentUserId] =
    useRecoilState<number>(currentUserIdState);
  // const [likeBtnClickOrNot, setLikeBtnClickOrNot] = useRecoilState<boolean>(
  //   likeButtonChangeState
  // );
  const [isNavLikeChange, setIsNavLikeChange] = useRecoilState<boolean>(
    navLikeButtonChangeState
  );
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeChange, setIsLikeChange] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const moveDetailHandler = (pjtId: number) => {
    navigate(`/project/${pjtId}`);
    onModalClose();
  };

  const dislikeHandler = async (projtId: number) => {
    await dislike(projtId, currentUserId);
    setIsLiked(false);
    setIsLikeChange(true);
    setIsNavLikeChange(!isNavLikeChange);
    onClickDislike();
  };
  const likeHandler = async (projtId: number) => {
    await like(projtId, currentUserId);
    setIsLiked(true);
    setIsLikeChange(true);
    setIsNavLikeChange(!isNavLikeChange);
  };
  useEffect(() => {
    (async function () {
      const likeUsersList = await fetchLikeUsers(pjtId);
      const likeOrNot = getLikeOrNot(currentUserId, likeUsersList);
      likeOrNot ? setIsLiked(true) : setIsLiked(false);
      const projtDetail: any = await fetchProjectDetail(pjtId);
      setLikeCnt(projtDetail.likeAmount);
      setIsLikeChange(false);
    })();
  }, [isNavLikeChange, currentUserId, isLikeChange]);

  return (
    <>
      <Card sx={{ height: cardHeight }} className={styles.card}>
        <CardMedia
          onClick={() => moveDetailHandler(pjtId)}
          className={styles.card_img}
          component="img"
          alt=""
          height={`${imgHeight}`}
          image={`/Assets/funding/${pjtId}.jpg`}
        />
        <CardContent>
          <Typography
            className={styles.pjt_title}
            onClick={() => moveDetailHandler(pjtId)}
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: 800 }}
          >
            {cutLongTitle(pjtTitle, 12)}
          </Typography>
          <div className={styles.heartArea}>
            <Typography variant="body2" color="text.secondary">
              {farmerName}
            </Typography>
            <div className={styles.heart_with_cnt}>
              <div className={styles.heart}>
                {isLiked ? (
                  <FavoriteIcon
                    // fontSize="large"
                    sx={{ color: mainGreen }}
                    onClick={() => dislikeHandler(pjtId)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    // fontSize="large"
                    sx={{ color: "#868686" }}
                    onClick={() => likeHandler(pjtId)}
                  />
                )}
              </div>
              <span className={styles.like}>{likeCnt}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default ProjectItem;

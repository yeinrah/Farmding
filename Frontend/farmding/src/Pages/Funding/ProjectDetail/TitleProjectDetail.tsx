import { useState, useEffect } from "react";
import styles from "./TitleProjectDetail.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { mainGreen } from "../../../Common/data/Style";
import { useRecoilState } from "recoil";
import { currentUserIdState } from "../../../Recoil/atoms/account";
import {
  dislike,
  fetchLikeUsers,
  like,
} from "../../../Common/API/likeFundingAPI";
import { fetchProjectDetail } from "../../../Common/API/fundingAPI";
import { navLikeButtonChangeState } from "../../../Recoil/atoms/funding";
import { getLikeOrNot } from "../../../Common/functions/GetLikeOrNot";

interface TitleProjectDetailProps {
  // imgArray: string[];
  projtId: number;
  title: string;
  farm: string;
  // likeCnt: number;
  // eachFunding: eachFunding;
}

const TitleProjectDetail = ({
  projtId,
  title,
  farm,
}: // likeCnt,
TitleProjectDetailProps) => {
  const [currentUserId, setCurrentUserId] =
    useRecoilState<number>(currentUserIdState);
  const [isNavLikeChange, setIsNavLikeChange] = useRecoilState<boolean>(
    navLikeButtonChangeState
  );
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [isLikeChange, setIsLikeChange] = useState(false);
  const dislikeHandler = async () => {
    await dislike(projtId, currentUserId);
    // setLikeBtnClickOrNot(!likeBtnClickOrNot);
    setIsLikeChange(false);
    setIsNavLikeChange(!isNavLikeChange);
  };
  const likeHandler = async () => {
    await like(projtId, currentUserId);
    // setLikeBtnClickOrNot(!likeBtnClickOrNot);
    setIsLikeChange(true);
    setIsNavLikeChange(!isNavLikeChange);
  };

  useEffect(() => {
    // setIsLoading(true);
    (async () => {
      const likeUsersList = await fetchLikeUsers(projtId);
      if (likeUsersList.length === 0) {
        setIsLiked(false);
        setLikeCnt(0);
      } else {
        setLikeCnt(likeUsersList.length);
        likeUsersList.includes(currentUserId)
          ? setIsLiked(true)
          : setIsLiked(false);
      }

      const projtDetail: any = await fetchProjectDetail(projtId);
      // setLikeCnt(projtDetail.likeAmount);
      // setIsLikeChange(false);
    })();
  }, [isNavLikeChange, currentUserId]);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.project_detail_banner}>
          <img src={`/Assets/funding/${projtId}_header.jpg`} alt="" />
        </div>

        <div className={styles.project_detail_banner_txt}>
          <div className={styles.banner_title}>{title}</div>
          {/* <h1>{title} </h1> */}
          <div className={styles.farm_like}>
            <h4>{farm}</h4>
            <div className={styles.heart_area}>
              <div className={styles.heart}>
                {isLiked ? (
                  <FavoriteIcon
                    fontSize="large"
                    sx={{ color: mainGreen }}
                    onClick={dislikeHandler}
                  />
                ) : (
                  <FavoriteBorderIcon
                    fontSize="large"
                    sx={{ color: "#868686" }}
                    onClick={likeHandler}
                  />
                )}
              </div>
              <div className={styles.like}>{likeCnt}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleProjectDetail;

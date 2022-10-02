import { useState, useEffect } from "react";
import styles from "./TitleProjectDetail.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { mainGreen } from "../../../Common/data/Style";
import { useRecoilState } from "recoil";
import { currentUserIdState } from "../../../Recoil/atoms/account";
import {
  dislike,
  getLikeOrNot,
  like,
} from "../../../Common/API/likeFundingAPI";
import { fetchProjectDetail } from "../../../Common/API/fundingAPI";

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

  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const dislikeHandler = async () => {
    await dislike(projtId, currentUserId);
    setIsLiked(false);
  };
  const likeHandler = async () => {
    await like(projtId, currentUserId);
    setIsLiked(true);
  };

  useEffect(() => {
    // setIsLoading(true);
    (async () => {
      const likeOrNot = await getLikeOrNot(projtId, currentUserId);
      likeOrNot ? setIsLiked(true) : setIsLiked(false);
      const projtDetail: any = await fetchProjectDetail(projtId);
      setLikeCnt(projtDetail.likeAmount);

      // for (const iterator of likeUsers) {
      //   if (iterator.id === currentUserId) {
      //     setIsLiked(true);
      //   }
      // }
    })();
  }, [isLiked]);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.project_detail_banner}>
          <img src={`/Assets/funding/${projtId}.jpg`} alt="" />
        </div>

        <div className={styles.project_detail_banner_txt}>
          <h1>{title} </h1>
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

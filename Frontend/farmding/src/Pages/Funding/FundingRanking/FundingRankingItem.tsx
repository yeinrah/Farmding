import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./FundingRanking.module.scss";
import { mainGreen } from "../../../Common/data/Style";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState } from "recoil";
import { navLikeButtonChangeState } from "../../../Recoil/atoms/funding";
import { cutLongTitle } from "../../../Common/functions/CutLongTitle";
import { fetchLikeUsers } from "../../../Common/API/likeFundingAPI";
import { currentUserIdState } from "../../../Recoil/atoms/account";
interface IFundingRankingItemProps {
  index: number;
  avatar: string;
  pjtId: number;
  pjtTitle: string;
  farmer: string;
  likeCnt: number;
}

const FundingRankingItem = ({
  index,
  avatar,
  pjtId,
  pjtTitle,
  farmer,
  likeCnt,
}: IFundingRankingItemProps) => {
  // const [currentUserId, setCurrentUserId] =
  //   useRecoilState<number>(currentUserIdState);
  // const [isNavLikeChange, setIsNavLikeChange] = useRecoilState<boolean>(
  //   navLikeButtonChangeState
  // );
  // const [isLiked, setIsLiked] = useState(false);
  // useEffect(() => {
  //   (async function () {
  //     const likeUsersList = await fetchLikeUsers(pjtId);
  //     // console.log(likeUsersList, pjtId, "현재유저");
  //     if (likeUsersList.length === 0) {
  //       setIsLiked(false);
  //     } else {
  //       for (const eachId of likeUsersList) {
  //         if (eachId === currentUserId) {
  //           setIsLiked(true);
  //         } else {
  //           setIsLiked(false);
  //         }
  //       }
  //     }
  //   })();
  // }, [isNavLikeChange, currentUserId]);
  return (
    <ListItem
      alignItems="flex-start"
      sx={{ margin: "3px 0px", cursor: "pointer" }}
    >
      {index < 3 && <div className={styles.rank1}>{index + 1}</div>}
      {index >= 3 && <div className={styles.rank}>{index + 1}</div>}
      <ListItemAvatar>
        <Avatar
          alt={avatar}
          src={`/Assets/funding/${pjtId}.jpg`}
          sx={{ cursor: "pointer" }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={cutLongTitle(pjtTitle, 12)}
        secondary={
          <div className={styles.detailInfo}>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="gray"
            >
              {farmer}
            </Typography>
            <div className={styles.heartArea}>
              {/* {isLiked ? (
                <FavoriteIcon
                  // fontSize="large"
                  sx={{ color: mainGreen }}
                />
              ) : (
                <FavoriteBorderIcon
                  // fontSize="large"
                  sx={{ color: "#868686" }}
                />
              )} */}
              <FavoriteBorderIcon sx={{ color: mainGreen }} />
              <span className={styles.like}>{likeCnt}</span>
            </div>
          </div>
        }
      />
    </ListItem>
  );
};
export default FundingRankingItem;

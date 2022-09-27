import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./FundingRanking.module.scss";
import { mainGreen } from "../../../Common/data/Style";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const FundingRanking = () => {
  const item = [
    {
      title: "올해의 마지막 제주감귤",
      avatar: "zemy",
      owner: "정서농장",
      like: 5,
      show: true,
    },
    {
      title: "올해의 마지막 제주포도",
      avatar: "aemy",
      owner: "상훈농장",
      like: 4,
      show: false,
    },
    {
      title: "올해의 마지막 제주오렌지",
      avatar: "bemy",
      owner: "예인농장",
      like: 3,
      show: true,
    },
    {
      title: "올해의 마지막 제주아보카도",
      avatar: "cemy",
      owner: "은민농장",
      like: 2,
      show: true,
    },
    {
      title: "올해의 마지막 제주복숭아",
      avatar: "demy",
      owner: "영진농장",
      like: 1,
      show: true,
    },
    {
      title: "올해의 마지막 제주복숭아",
      avatar: "demy",
      owner: "영진농장2",
      like: 1,
      show: true,
    },
    {
      title: "올해의 마지막 제주복숭아",
      avatar: "demy",
      owner: "영진농장3",
      like: 1,
      show: true,
    },
    {
      title: "올해의 마지막 제주복숭아",
      avatar: "demy",
      owner: "영진농장4",
      like: 1,
      show: true,
    },
  ];
  const sortedItem = item
    .filter((item) => item.show)
    .sort((a, b) => b.like - a.like);

  const cutLongTitle = (title: string) => {
    if (title.length > 12) return title.slice(0, 12) + "..";
    return title;
  };
  return (
    <div className={styles.rankingBox}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <h3 className={styles.title}>실시간 랭킹</h3>
        {sortedItem.map((item, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start" sx={{ margin: "10px 0px" }}>
              <div className={styles.rank}>{index + 1}</div>
              <ListItemAvatar>
                <Avatar
                  alt={item.avatar}
                  src="/static/images/avatar/1.jpg"
                  sx={{ cursor: "pointer" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={cutLongTitle(item.title)}
                secondary={
                  <div className={styles.detailInfo}>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="gray"
                    >
                      {item.owner}
                    </Typography>
                    <div className={styles.heartArea}>
                      <FavoriteBorderIcon sx={{ color: mainGreen }} />
                      <span className={styles.like}>{item.like}</span>
                    </div>
                  </div>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
};
export default FundingRanking;
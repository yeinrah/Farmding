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
import styles from "./FundingRanking.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const FundingRanking = () => {
  const item = [
    {
      title: "올해의 마지막 제주감귤",
      avatar: "zemy",
      owner: "정서농장",
      like: 5,
    },
    {
      title: "올해의 마지막 제주포도",
      avatar: "aemy",
      owner: "상훈농장",
      like: 4,
    },
    {
      title: "올해의 마지막 제주오렌지",
      avatar: "bemy",
      owner: "예인농장",
      like: 3,
    },
    {
      title: "올해의 마지막 제주아보카도",
      avatar: "cemy",
      owner: "은민농장",
      like: 2,
    },
    {
      title: "올해의 마지막 제주복숭아",
      avatar: "demy",
      owner: "영진농장",
      like: 1,
    },
  ];
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <h3>실시간 랭킹</h3>
      {item.map((item, index) => (
        <div key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={item.avatar} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
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
                    <FavoriteBorderIcon sx={{ color: "green" }} />
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
  );
};
export default FundingRanking;

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./FundingRanking.module.scss";
import { mainGreen } from "../../../Common/data/Style";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRecoilState } from "recoil";
import { navLikeButtonChangeState } from "../../../Recoil/atoms/funding";
import FundingRankingItem from "./FundingRankingItem";
interface IFundingRankingProps {
  allProjects: fundingProject[];
  moveDetailHandler: (ptjId: number) => void;
}
interface fundingProject {
  category: number;
  currentAmount: number;
  farmerName: string;
  farmerWalletAddress: string;
  funderCount: number;
  fundingStatus: string;
  likeAmount: number;
  projectCreatedDate: string;
  projectEndDate: string;
  projectExplanation: string;
  projectId: number;
  projectPeriod: number;
  projectTitle: string;
  targetAmount: number;
}
const FundingRanking = ({
  allProjects,
  moveDetailHandler,
}: IFundingRankingProps) => {
  const sortedItem: any = allProjects
    .filter((item: any) => item.fundingStatus === "open")
    .sort((a: any, b: any) => b.likeAmount - a.likeAmount);

  const cutLongTitle = (title: string) => {
    if (title.length > 12) return title.slice(0, 12) + "..";
    return title;
  };

  return (
    <div className={styles.rankingBox}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <h3 className={styles.title}>실시간 랭킹</h3>
        {sortedItem.slice(0, 7).map((item: any, index: any) => (
          <div
            key={index}
            onClick={() => {
              moveDetailHandler(item.projectId);
            }}
          >
            <FundingRankingItem
              index={index}
              avatar={item.avatar}
              pjtId={item.projectId}
              pjtTitle={item.projectTitle}
              farmer={item.farmerName}
              likeCnt={item.likeAmount}
            />
            {/* <ListItem
              alignItems="flex-start"
              sx={{ margin: "10px 0px", cursor: "pointer" }}
            >
              {index < 3 && <div className={styles.rank1}>{index + 1}</div>}
              {index >= 3 && <div className={styles.rank}>{index + 1}</div>}
              <ListItemAvatar>
                <Avatar
                  alt={item.avatar}
                  src={`/Assets/funding/${item.projectId}.jpg`}
                  sx={{ cursor: "pointer" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={cutLongTitle(item.projectTitle)}
                secondary={
                  <div className={styles.detailInfo}>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="gray"
                    >
                      {item.farmerName}
                    </Typography>
                    <div className={styles.heartArea}>
                      <FavoriteBorderIcon sx={{ color: mainGreen }} />
                      <span className={styles.like}>{item.likeAmount}</span>
                    </div>
                  </div>
                }
              />
            </ListItem> */}
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
};
export default FundingRanking;

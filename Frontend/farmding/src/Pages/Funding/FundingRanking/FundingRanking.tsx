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
  // sortedProjects: fundingProject[];
  moveDetailHandler: (ptjId: number) => void;
}
export interface fundingProject {
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
}: // sortedProjects,
IFundingRankingProps) => {
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
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
};
export default FundingRanking;

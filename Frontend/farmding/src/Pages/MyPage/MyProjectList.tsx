import { useEffect, useState } from "react";

// mui
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// scss
import styles from "./MyProjectList.module.scss";
import { fetchMyFundings } from "../../Common/API/fundingAPI";
import { currentUserIdState } from "../../Recoil/atoms/account";
import { useRecoilState } from "recoil";
import ProjectItem from "../Funding/FundingProject/ProjectItem";
import MyProject from "./MyProject";
import { cutLongTitle } from "../../Common/functions/CutLongTitle";

export interface IMyPjtList {
  projectId: number;
  projectTitle: string;
  allOfFundingFee: number;
  rewardName: string;
  amount: number;
  deliveryFee: number;
  deliveryDate: string;
}
const MyProjectList = () => {
  const [myProjects, setMyProjects] = useState([
    {
      projectId: 0,
      projectTitle: "",
      allOfFundingFee: 0,
      rewardName: "",
      amount: 0,
      deliveryFee: 0,
      deliveryDate: "",
    },
  ]);

  const [currentUserId, setCurrentUserId] =
    useRecoilState<number>(currentUserIdState);
  useEffect(() => {
    (async function () {
      // 이거 +1한거 빼야함!!!!!!!! API 수정하고!!!!!!!!!!!!!
      // const myPjts: any = await fetchMyFundings(currentUserId);
      const myPjts: any = await fetchMyFundings(currentUserId);
      setMyProjects(myPjts);
    })();
  }, []);
  return (
    <>
      {myProjects.map((pjt: IMyPjtList, idx) => (
        <MyProject
          key={idx}
          projectId={pjt.projectId}
          projectTitle={cutLongTitle(pjt.projectTitle, 12)}
          fundingAmount={pjt.allOfFundingFee}
          quantity={pjt.amount}
          unit={pjt.rewardName}
          shippingFee={pjt.deliveryFee}
          expectedDate={pjt.deliveryDate.substr(0, 10)}
        />
      ))}
    </>
  );
};
export default MyProjectList;

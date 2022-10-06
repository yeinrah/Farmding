import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./MyProject.module.scss";
import FundingComplete from "../Funding/Reward/FundingComplete";
import {
  fetchProjectDetail,
  fetchRewardDetail,
} from "../../Common/API/fundingAPI";
import { useNavigate } from "react-router-dom";

export interface IMyPjt {
  projectId: number;
  projectTitle: string;
  fundingAmount: number;
  quantity: number;
  unit: string;
  shippingFee: number;
  expectedDate: string;
}
const MyProject = ({
  projectId,
  projectTitle,
  fundingAmount,
  quantity,
  unit,
  shippingFee,
  expectedDate,
}: IMyPjt) => {
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState("");
  const [price, setPrice] = useState(0);
  const moveDetailHandler = (pjtId: number) => {
    navigate(`/project/${pjtId}`);
  };

  useEffect(() => {
    (async function () {
      const pjtDetail: any = await fetchProjectDetail(projectId);
      setFarmer(pjtDetail.farmerName);
      const rwdDetail: any = await fetchRewardDetail(projectId);
      setPrice(rwdDetail.ssfPrice);
    })();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
          width: "90%",
        }}
      >
        <Card
          sx={{
            width: 400,
            height: 220,
            marginLeft: "10%",
            mr: 4,
            mt: "12px",
            // my: "auto",
            cursor: "pointer",
          }}
          className={styles.card_img}
          onClick={() => moveDetailHandler(projectId)}
        >
          <CardMedia
            component="img"
            alt=""
            height="100%"
            image={`/Assets/funding/${projectId}.jpg`}
          />
        </Card>

        <FundingComplete
          title={projectTitle}
          farmer={farmer}
          price={price}
          unit={unit}
          shippingFee={shippingFee}
          expectedDate={expectedDate}
          selectedQuantity={quantity}
        />
      </Box>
      <hr />
    </>
  );
};
export default MyProject;

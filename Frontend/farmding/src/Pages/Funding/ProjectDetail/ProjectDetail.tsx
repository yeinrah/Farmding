import { useState, useEffect } from "react";
import TitleProjectDetail from "./TitleProjectDetail";
import FundingProjectDetail from "./FundingProjectDetail";

import { useParams } from "react-router-dom";

// scss
import styles from "./ProjectDetail.module.scss";
import InfoProjectDetail from "./InfoProjectDetail";
import { fetchProjectDetail } from "../../../Common/API/fundingAPI";

export interface IPjtDetail {
  category: number;
  projectId: number;
  projectTitle: string;
  projectExplanation: string;
  farmerName: string;
  funderCount: number;
  currentAmount: number;
  targetAmount: number;
  likeAmount: number;
  projectPeriod: number;
}

const ProjectDetail = () => {
  const { pjtId } = useParams();
  const [pjtDetail, setPjtDetail] = useState({
    category: 0,
    projectId: 0,
    projectTitle: "",
    projectExplanation: "",
    farmerName: "",
    funderCount: 0,
    currentAmount: 0,
    targetAmount: 0,
    likeAmount: 0,
    projectPeriod: 0,
  });

  const images = ["1_2", "1_3", "1_4", "1_5", "1_6"];

  useEffect(() => {
    (async function () {
      const projtDetail: any = await fetchProjectDetail(Number(pjtId));
      setPjtDetail(projtDetail);
    })();
  }, []);

  return (
    <>
      <div>
        <TitleProjectDetail
          projtId={pjtDetail.projectId}
          title={pjtDetail.projectTitle}
          farm={pjtDetail.farmerName}
          likeCnt={pjtDetail.likeAmount}
        />
      </div>
      <div className={styles.project_detail}>
        <div className={styles.project_detail_info}>
          <InfoProjectDetail
            projtId={pjtDetail.projectId}
            imgArray={images}
            farm={pjtDetail.farmerName}
            projectInfo={pjtDetail.projectExplanation}
          />
        </div>
        <div className={styles.project_detail_funding}>
          <FundingProjectDetail
            projtId={pjtDetail.projectId}
            fundingAmount={pjtDetail.currentAmount}
            targetAmount={pjtDetail.targetAmount}
            funders={pjtDetail.funderCount}
            remainingDays={pjtDetail.projectPeriod}
            title={pjtDetail.projectTitle}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;

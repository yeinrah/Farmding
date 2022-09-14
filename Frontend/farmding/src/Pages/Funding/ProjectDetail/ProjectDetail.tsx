import { useState } from "react";
import TitleProjectDetail from "./TitleProjectDetail";
import FundingProjectDetail from "./FundingProjectDetail";

// scss
import styles from "./ProjectDetail.module.scss";
import InfoProjectDetail from "./InfoProjectDetail";

const ProjectDetail = () => {
  const projectDetailInfo = {
    title: "올해의 마지막 영동포도입니다",
    farm: "정서농장",
    images: ["grape.png", "farm1.jpg", "grape.png", "farm1.jpg", "grape.png", "farm1.jpg", "grape.png"],
    likeCnt: 5,
    fundingAmount: 1240,
    targetAmount: 800,
    funders: 17,
    remainingDays: 13,
    projectInfo: 
    '8월부터 11월까지는 포도 제철이에요.이에 많은 분들이 원하셨던 영영농장의 포도를 선보입니다.당일 수확 당일 배송! 20brix의 고당도 포도!영영 농장의 농부님은 이미 오래전부터 곶감, 인삼,사과, 복숭아 등 다양한 과일을 재배하고 계신 농사계의 베테랑입니다.8월부터 11월까지는 포도 제철이에요.이에 많은 분들이 원하셨던 영영농장의 포도를 선보입니다.당일 수확 당일 배송! 20brix의 고당도 포도!영영 농장의 농부님은 이미 오래전부터 곶감, 인삼,사과, 복숭아 등 다양한 과일을 재배하고 계신 농사계의 베테랑입니다.'
  };

  // const [projectDetailInfo, setProjectDetailInfo] = useState({
  //   title: "올해의 마지막 제주감귤",
  //   farm: "정서농장",
  //   images: ["grape.png", "grape.png", "grape.png", "grape.png", "grape.png"],
  //   likeCnt: 5,
  //   farmInfo: 
  //   '8월부터 11월까지는 포도 제철이에요.이에 많은 분들이 원하셨던 영영농장의 포도를 선보입니다.당일 수확 당일 배송! 20brix의 고당도 포도!영영 농장의 농부님은 이미 오래전부터 곶감, 인삼,사과, 복숭아 등 다양한 과일을 재배하고 계신 농사계의 베테랑입니다.'
  // })
  
  return (
    <>
      <div>
        <TitleProjectDetail 
          mainImg={projectDetailInfo.images[0]}
          title ={projectDetailInfo.title}
          farm = {projectDetailInfo.farm}
          likeCnt = {projectDetailInfo.likeCnt}
        />

      </div>
      <div className={styles.project_detail}>
        <div className={styles.project_detail_info}>
          <InfoProjectDetail 
            imgArray={projectDetailInfo.images}
            farm = {projectDetailInfo.farm}
            projectInfo = {projectDetailInfo.projectInfo}
          />
        </div>
        <div className={styles.project_detail_funding}> 
          <FundingProjectDetail 
            fundingAmount= {projectDetailInfo.fundingAmount}
            targetAmount= {projectDetailInfo.targetAmount}
            funders= {projectDetailInfo.funders}
            remainingDays={projectDetailInfo.remainingDays}
          />

        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
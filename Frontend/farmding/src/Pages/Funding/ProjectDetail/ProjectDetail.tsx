import { useState, useEffect } from "react";
import TitleProjectDetail from "./TitleProjectDetail";
import FundingProjectDetail from "./FundingProjectDetail";

import { useParams, useNavigate } from "react-router-dom";

// scss
import styles from "./ProjectDetail.module.scss";
import InfoProjectDetail from "./InfoProjectDetail";
import { fetchProjectDetail } from "../../../Common/API/fundingAPI";
import CustomBtn from "../../../Common/UI/CustomBtn/CustomBtn";
import { claimHandler, launchingHandler } from "../../../utils/fundingProject";
import { adminAddress } from "../../../Common/data/adminAddress";
import { useRecoilState } from "recoil";
import { isAccountChangedState } from "../../../Recoil/atoms/account";
import { loginState } from "../../../Recoil/atoms/auth";
import {
  dateToUnixConverter,
  getRemainingDays,
} from "../../../Common/functions/DateConverter";

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
  const navigate = useNavigate();
  const { ethereum } = window;
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [isAccountChanged, SetIsAccountChanged] = useRecoilState<boolean>(
    isAccountChangedState
  );
  ethereum.on("accountsChanged", (accounts: any) => {
    SetIsAccountChanged(true);
  });
  const { pjtId } = useParams();
  const [isLoading, SetIsLoading] = useState(true);
  const [currentAccount, setCurrentAccount] = useState("");
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
    projectEndDate: "",
    // remainingDays: 0,
  });

  const images = ["1_2", "1_3", "1_4", "1_5", "1_6"];
  const remainingDays = getRemainingDays(pjtDetail.projectEndDate);
  console.log(remainingDays, "디데이!!!!!!!!!!!!!!!!!!!");

  useEffect(() => {
    (async function () {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (!accounts.length) {
        console.log(accounts);
        setIsLogin(false);
        // navigate("/login");
        // return;
      }

      setCurrentAccount(accounts[0]);
      console.log(accounts[0]);

      const projtDetail: any = await fetchProjectDetail(Number(pjtId));
      setPjtDetail(projtDetail);
      SetIsAccountChanged(false);
      SetIsLoading(false);
    })();
  }, [isAccountChanged]);

  return (
    <>
      {!isLoading ? (
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
              {currentAccount === adminAddress && (
                <div>
                  <CustomBtn
                    customSx={{
                      width: "200px",
                      height: "50px",
                      fontSize: "20px",
                      letterSpacing: 3,
                    }}
                    onclick={() =>
                      launchingHandler(
                        pjtDetail.targetAmount,
                        pjtDetail.projectEndDate
                      )
                    }
                    btnWord={"런칭"}
                  />
                  <CustomBtn
                    customSx={{
                      width: "200px",
                      height: "50px",
                      fontSize: "20px",
                      letterSpacing: 3,
                    }}
                    onclick={() => claimHandler(pjtDetail.projectId)}
                    // btnWord={"다음 단계로"}
                    btnWord={"claim"}
                  />
                </div>
              )}
              <FundingProjectDetail
                projtId={pjtDetail.projectId}
                fundingAmount={pjtDetail.currentAmount}
                targetAmount={pjtDetail.targetAmount}
                funders={pjtDetail.funderCount}
                remainingDays={remainingDays}
                title={pjtDetail.projectTitle}
              />
            </div>
          </div>
        </>
      ) : (
        "로딩중"
      )}
    </>
  );
};

export default ProjectDetail;

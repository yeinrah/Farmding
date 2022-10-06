import Swal from "sweetalert2";
import { dateToUnixConverter } from "../Common/functions/DateConverter";
import {
  CrowdFundingAddress,
  CrowdFundingContract,
  SSFTokenContract,
} from "../Web3Config";

// import Web3 from 'web3';
const { ethereum } = window;

export const launchingHandler = async (
  targetAmount: number,
  closeDate: string
) => {
  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    // sale컨트랙트로 erc20토큰 전송권한 허용
    // const price = 3;
    const unixFundingCloseDate = dateToUnixConverter(closeDate);

    const launchRes = await CrowdFundingContract.methods
      .launch(targetAmount, unixFundingCloseDate)
      .send({ from: accounts[0] });

    const projectId = launchRes.events.Launch.returnValues.id;
    const beneficiary = launchRes.events.Launch.returnValues.beneficiary;
    const goal = launchRes.events.Launch.returnValues.goal;
    const endAt = launchRes.events.Launch.returnValues.endAt;
    // fundingAddr = launchRes.events.Launch.returnValues.fundingAddr;
    Swal.fire({
      icon: "success",
      title: `${projectId}번 프로젝트 런칭 완료`,
    });
    console.log(projectId, beneficiary, goal, endAt);

    // funding 요청

    // const isSended = await SSFTokenContract.methods
    // .transferFrom(accounts[0], "0x2113D5636FF11747176A23E79989f1eBa7f3cA60", price)
    // .send({ from: accounts[0] });
    // console.log('결과' , isSended)
  } catch (error) {
    console.log(error);
  }
};

export const claimHandler = async (pjtId: number) => {
  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    const claimRes = await CrowdFundingContract.methods
      .claim(pjtId)
      .send({ from: accounts[0] });
    // console.log(claimRes);
    const claimId = claimRes.events.Claim.returnValues.id;
    Swal.fire({
      icon: "success",
      title: `${claimId} 번 프로젝트 클레임 완료`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fundingHandler = async (
  pjtId: number,
  fundingAmount: number,
  shippingFee: number
) => {
  let result;
  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const fundingPrice = fundingAmount + shippingFee;
    // funding- pledge
    await SSFTokenContract.methods
      .approve(CrowdFundingAddress, fundingPrice)
      .send({ from: accounts[0] });

    const fundingRes = await CrowdFundingContract.methods
      .fund(pjtId, fundingPrice)
      .send({ from: accounts[0] });
    const fundId = fundingRes.events.Fund.returnValues.id;
    const caller = fundingRes.events.Fund.returnValues.caller;
    const amount = fundingRes.events.Fund.returnValues.amount;
    // Swal.fire({
    //   icon: "success",
    //   title: `${caller}가 ${amount}만큼 펀딩 완료했습니다`,
    // });
    result = true;

    // funding 요청
  } catch (error) {
    console.log(error);
    result = false;
    console.log("펀딩 에러");
  }
  return result;
};

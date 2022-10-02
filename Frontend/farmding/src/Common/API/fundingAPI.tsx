import apiInstance from "./index";

const api = apiInstance();
const defaultSuccess = (res: any) => {};
const defaultFail = (err: any) => {};

export const fetchPopularProjects = async () => {
  let result = null;
  await api
    .get("/funding/popular_fundings")
    .then((res) => {
      result = res.data;
      console.log("인기프로젝트 fetch", result);
    })
    .catch((err) => {
      console.log("인기 프로젝트 fetch 에러");
    });
  return result;
};

export const fetchProjectDetail = async (pjtId: number) => {
  let result = null;
  await api
    .get(`/funding/${pjtId}`)
    .then((res) => {
      result = res.data.project;
      console.log("개별 프로젝트 fetch", result);
    })
    .catch((err) => {
      console.log("개별 프로젝트 fetch 에러");
    });
  return result;
};

export const fetchRewardDetail = async (pjtId: number) => {
  let result = null;
  await api
    .get(`/funding/detail/${pjtId}`)
    .then((res) => {
      // 중요!!!!!!!!!**********************************************
      // res.data[0]으로 바꾸기!!!!!!!!!!!!!!!!!!!!!!!!
      // result = res.data[0];
      // 중요!!!!!!!!!**********************************************
      result = res.data[3];
      console.log("리워드 fetch", result);
    })
    .catch((err) => {
      console.log("리워드 fetch 에러");
    });
  return result;
};

export const updateRewardResidual = async (
  rewardId: number,
  selectedAmount: number,
  success = defaultSuccess,
  fail = defaultFail
) => {
  const data = {
    amount: selectedAmount,
    rewardId,
  };
  await api
    .patch(`/funding/detail/updateAmount`, JSON.stringify(data))
    .then(success)
    .catch(fail);
};

export const addUserRewardQuantityInfo = async (
  projectId: number,
  userId: number,
  rewardId: number,
  selectedAmount: number,
  success = defaultSuccess,
  fail = defaultFail
) => {
  const data = {
    amount: selectedAmount,
    projectId,
    userId,
    rewardId,
  };
  await api
    .post(`/funding/detail/insertFundingList`, JSON.stringify(data))
    .then(success)
    .catch(fail);
};

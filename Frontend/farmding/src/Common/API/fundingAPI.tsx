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
    })
    .catch((err) => {});
  return result;
};

export const fetchProjectDetail = async (pjtId: number) => {
  let result = null;
  await api
    .get(`/funding/${pjtId}`)
    .then((res) => {
      result = res.data.project;
    })
    .catch((err) => {});
  return result;
};

export const fetchRewardDetail = async (pjtId: number) => {
  let result = null;
  await api
    .get(`/funding/detail/${pjtId}`)
    .then((res) => {
      result = res.data[0];
    })
    .catch((err) => {});
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

export const fetchMyFundings = async (userId: number) => {
  let result = null;
  await api
    .get(`/funding/detail/MyPageFundingList/${userId}`)
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};
export const fetchAllProjects = async () => {
  let result = null;
  await api
    .get(`/funding/projects`)
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      result = err;
      console.log("모든 프로젝트 fetch 에러");
    });
  return result;
};

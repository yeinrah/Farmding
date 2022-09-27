import apiInstance from "./index";

const api = apiInstance();

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

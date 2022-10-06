import apiInstance from "./index";

const api = apiInstance();
const defaultSuccess = (res: any) => {};
const defaultFail = (err: any) => {};

export const fetchLikeFundingLists = async (userId: number) => {
  let result = null;
  await api
    .get(`/funding/like/${userId}`)
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log("좋아요한 프로젝트 fetch 에러ㅠㅠㅠ");
    });
  return result;
};

export const fetchLikeUsers = async (pjtId: number) => {
  let result: number[] = [];
  await api
    .get(`/funding/detail/UserLikeOfProject/${pjtId}`)
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      result = err;
      console.log("좋아요 누른 유저들 fetch 에러");
    });
  return result;
};

// export const getLikeOrNot = async (pjtId: number, userId: number) => {
//   let result = null;
//   const data = {
//     projectId: pjtId,
//     userId,
//   };
//   await api
//     .post(`/funding/detail/likeClickOrNot`, JSON.stringify(data))
//     .then((res) => {
//       result = res.data;
//       console.log("좋아요 누른지 아닌지", result);
//     })
//     .catch((err) => {
//       console.log("좋아요 누른지 아닌지 에러ㅠㅠㅠ");
//     });
//   return result;
// };

export const like = async (
  pjtId: number,
  userId: number,
  success = defaultSuccess,
  fail = defaultFail
) => {
  const data = {
    projectId: pjtId,
    userId,
  };
  await api
    .post(`/funding/detail/insertLike`, JSON.stringify(data))
    .then(success)
    .catch(fail);
};

export const dislike = async (
  pjtId: number,
  userId: number,
  success = defaultSuccess,
  fail = defaultFail
) => {
  const data = {
    projectId: pjtId,
    userId,
  };
  await api
    .post(`/funding/detail/deleteLike`, JSON.stringify(data))
    .then(success)
    .catch(fail);
};

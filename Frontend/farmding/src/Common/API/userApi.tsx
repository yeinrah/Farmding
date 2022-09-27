import apiInstance from "./index";

const api = apiInstance();

// export const fundingProjectsApi = async () => {
//   let result = null;
//   await api
//     .get("/items")
//     .then((res) => {
//       result = res;
//     })
//     .catch((err) => {});
//   return result;
// };

const userAddressExistCheck = async (account: string) => {
  let result = await api.get(`/user/confirm/${account}`);
  return result;
};

export { userAddressExistCheck };

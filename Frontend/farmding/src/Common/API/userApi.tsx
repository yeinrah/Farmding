import { Navigate, useNavigate } from "react-router-dom";
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
const userNicknameExistCheck = async (nickname: string) => {
  let result = await api.get(`/user/confirm/checkuser/${nickname}`);
  return result;
};
const chagneMyAddress = async () => {};
const getMyInfo = async (walletAddress: string) => {
  let userInfo = await api.get(`/user/mypage/mynft/${walletAddress}`);
  return userInfo;
};
const userSignUp = async (
  address: string,
  nickname: string,
  phoneNumber: string,
  walletAddress: string
) => {
  await api.post(`/user/join`, {
    address: address,
    nickname: nickname,
    phoneNumber: phoneNumber,
    walletAddress: walletAddress,
  });
};
export { userAddressExistCheck, userNicknameExistCheck, userSignUp, getMyInfo };

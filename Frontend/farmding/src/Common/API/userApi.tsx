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
  // .then(() => {
  //   const navigate = useNavigate();
  //   alert("회원가입 완료");
  //   navigate("/");
  //   return <Navigate to="/" />;
  // })
  // .catch((e) => {
  //   console.log(e);
  //   alert("회원가입 실패");
  // });
};
export { userAddressExistCheck, userNicknameExistCheck, userSignUp };

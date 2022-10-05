import styles from "./Main.module.scss";
import Banner from "../Common/UI/Banner/Banner";
import SearchBar from "../Common/UI/SearchBar/SearchBar";
import ProjectItemList from "./Funding/FundingProject/ProjectItemList";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  currentUserIdState,
  currentUserNameState,
  isAccountChangedState,
} from "../Recoil/atoms/account";
import { loginState } from "../Recoil/atoms/auth";
import { getMyInfo } from "../Common/API/userApi";
import { navLikeButtonChangeState } from "../Recoil/atoms/funding";
const Main = () => {
  const { ethereum } = window;
  const [isAccountChanged, SetIsAccountChanged] = useRecoilState<boolean>(
    isAccountChangedState
  );
  const [isNavLikeChange, setIsNavLikeChange] = useRecoilState<boolean>(
    navLikeButtonChangeState
  );
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [currentUserName, setCurrentUserName] =
    useRecoilState<string>(currentUserNameState);
  const [currentUserId, setCurrentUserId] =
    useRecoilState<number>(currentUserIdState);

  ethereum.on("accountsChanged", (accounts: any) => {
    setIsLogin(false);
  });

  useEffect(() => {
    (async function () {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (!accounts.length) {
        setIsLogin(false);
      } else {
        const userInfo = await getMyInfo(accounts[0]);
        setCurrentUserName(userInfo.data.user.nickname);
        setCurrentUserId(userInfo.data.user.userId);
        console.log(userInfo.data.user.userId, userInfo.data.user.nickname);
      }
      SetIsAccountChanged(false);
    })();
  }, [isAccountChanged, currentUserId]);

  // useEffect(() => {
  //   setIsNavLikeChange(false);
  // }, [currentUserId]);

  return (
    <>
      <Banner imgSrc={"/Assets/background/cover2.jpg"} isMain={true} />
      {/* <Banner
        imgSrc={
          "https://previews.123rf.com/images/sripfoto/sripfoto1402/sripfoto140200038/25755981-%EA%B3%B5%EC%9E%A5%EC%97%90-%EC%8B%A0%EC%84%A0%ED%95%9C-%EC%98%A4%EB%A0%8C%EC%A7%80-%EC%98%A4%EB%A0%8C%EC%A7%80-%EB%82%98%EB%AC%B4.jpg"
        }
        isMain={true}
      /> */}
      <ProjectItemList />
    </>
  );
};
export default Main;

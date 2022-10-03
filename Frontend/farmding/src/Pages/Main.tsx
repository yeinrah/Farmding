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
const Main = () => {
  const { ethereum } = window;
  const [isAccountChanged, SetIsAccountChanged] = useRecoilState<boolean>(
    isAccountChangedState
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

  return (
    <>
      <Banner imgSrc={"/Assets/farm1.jpg"} isMain={true} />
      <div className={styles.searchBar}>
        <SearchBar placeHolder={"어떤 과일을 드시고 싶으세요?"} />
      </div>
      <ProjectItemList />
    </>
  );
};
export default Main;

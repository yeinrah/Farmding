import CustomBtn from "../../Common/UI/CustomBtn/CustomBtn";
import { useEffect, useState } from "react";

// // web3
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "ethers/lib/utils";
import { injected } from "../../lib/connectors";

//recoil
import { useRecoilState } from "recoil";
import { loginState } from "../../Recoil/atoms/auth";
import Swal from "sweetalert2";

export interface IResult {
  _hex: string;
  _isBigNumber: boolean;
}

const Landing = () => {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const { chainId, account, library, active, activate, deactivate } =
    useWeb3React();
  const [myAccount, setMyAccount] = useState(account);
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const btnName = isLogin ? "로그아웃" : "로그인";

  const metamaskLoginHandler = async () => {
    if (active) {
      deactivate();
      setIsLogin(false);
      return;
    }

    try {
      await activate(injected, (error) => {
        // 크롬 익스텐션 없을 경우 오류 핸들링
        if ("/No Ethereum provider was found on window.ethereum/")
          throw new Error("Metamask 익스텐션을 설치해주세요");
      });
      setIsLogin(true);
      setMyAccount(account);
      setIsLoading(false);
      !isLoading && console.log("활성화 성공", account);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Metamask error!",
        text: "err",
      });
      window.open("https://metamask.io/download.html");
    }
  };

  useEffect(() => {
    if (account) {
      // console.log('지갑주소: ', account, )
      library?.getBalance(account).then((result: IResult) => {
        setBalance(result._hex);
        // console.log(result)
      });
    }
    // if (account) {
    // }
    // active ? setIsLogin(true) : setIsLogin(false);
    isLogin ? activate(injected) : deactivate();

    // if (isLogin) {
    //   activate(injected)
    // }
  }, [isLogin, account, library]);

  return (
    <>
      <h1></h1>
      <CustomBtn
        customSx={{
          width: "300px",
          height: "100px",
          fontSize: "20px",
          letterSpacing: 3,
        }}
        bgColor={"mainGreen"}
        onclick={metamaskLoginHandler}
        btnWord={btnName}
      />
      {isLogin ? (
        <div className="text-center">My Wallet: {account}</div>
      ) : (
        <div className="text-center">로그인해주세요!</div>
      )}
    </>
  );
};
export default Landing;

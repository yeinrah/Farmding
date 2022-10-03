import { env } from "process";
import React, { useEffect, useState } from "react";
// import MetaMaskOnboarding from "@metamask/onboarding";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getMyInfo } from "../../Common/API/userApi";
import { userAddressExistCheck } from "../../Common/API/userApi";
import CustomBtn from "../../Common/UI/CustomBtn/CustomBtn";
import { currentUserNameState } from "../../Recoil/atoms/account";
import { loginState } from "../../Recoil/atoms/auth";
import { SSFTokenAddress, web3 } from "../../Web3Config";
import styles from "./Login.module.scss";
// import "./Login.css";

//// component
const Login = () => {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [onboardButtonText, setOnboardButtonText] = useState<string>("");
  const [account, setAccount] = useState("");
  const [currentUserName, setCurrentUserName] =
    useRecoilState<string>(currentUserNameState);

  const btnName = isLogin ? "로그아웃" : "로그인";
  const navigate = useNavigate();
  useEffect(() => {
    initialize();
  }, []);

  const { ethereum } = window;
  // 지갑 변경시 잔고 조회 다시 하기!

  // const currentUrl = new URL(window.location.href);
  // const forwarderOrigin ="https://j7a608.p.ssafy.io/";
  // const navigate = useNavigate();
  // const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  const initialize = () => {
    MetaMaskClientCheck();
  };

  // 브라우저에 메타마스크가 깔려있는지 확인하는 함수
  const isMetaMaskInstalled = () => {
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  // 메타마스크 설치 여부에 따라 텍스트 변경
  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      setOnboardButtonText("메타마스크 설치");
    } else {
      setOnboardButtonText("메타마스크 연결");
    }
  };

  // 메타마스크 설치 여부에 따라 onClick함수 변경(설치 or 연결)
  const onClickButton = () => {
    if (!isMetaMaskInstalled()) {
      onClickInstall();
    } else {
      onClickConnect();
    }
  };

  // 메타마스크 확장 프로그램 설치하는 페이지로 보냄
  const onClickInstall = () => {
    window.open("https://metamask.io/download.html");
    // onboarding.startOnboarding();
  };

  // 메타마스크 연결
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (!(await userAddressExistCheck(accounts[0])).data) {
        navigate("/signup");
        return;
      }
      setAccount(accounts[0]);
      // 토큰 자동불러오기 (이미 등록되어있어도 뜸.. 이건 해결방법은 없음(못찾는게아니라 애초에 방법이없음))
      // https://coder-solution.com/solution-blog/288728 참고

      const chainId = 31221;
      const rpcurl = "http://20.196.209.2:8545";

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(chainId) }],
      });

      await ethereum
        .request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: SSFTokenAddress,
              symbol: "SSF",
              decimals: 0,
              image: "",
            },
          },
        })
        .then((success: any) => {
          if (success) {
          } else {
            throw new Error("Something went wrong.");
          }
        })
        .catch(console.error);

      // login
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      alert("메타마스크에 연결중 오류가 발생하였습니다.");
    }
  };

  //   const login = useMutation<any, Error>(
  //     "postPurchase",
  //     async () => {
  //       return postLogin(account)
  //     },
  //     {
  //       onSuccess: (res) => {
  //       sessionStorage.setItem("userId", res.userId)
  //       sessionStorage.setItem("userNickname", res.userNick)
  //       navigate("/")
  //       window.location.reload();
  //     },
  //     onError: (err: any) => {
  //     },
  //   }
  // );
  const onclickAlert = () => {
    alert(
      "저희 사이트에는 개인지갑을 편리하고 안전하게 관리할 수 있는 구글 확장프로그램인 메타마스크를 이용하여 로그인 합니다.\n" +
        "이미 지갑을 소유하셨다면 회원가입 절차 필요없이 서비스를 바로 이용할 수 있습니다."
    );
  };

  return (
    <div className={styles.LoginMain}>
      {/* <div style={{backgroundImage:`url("/Assets/login_background.png")`}}className={styles.back}> 
    </div>     */}
      <img
        src={process.env.PUBLIC_URL + "/Assets/login_background.png"}
        className={styles.back}
      />
      <div className={styles.LoginMenu}>
        {isMetaMaskInstalled() ? (
          <h1 className={styles.p}>지갑에 연결하세요</h1>
        ) : (
          <h1 className={styles.p}>지갑이 없으신가요?</h1>
        )}
        <div className={styles.p}>
          <img
            src={process.env.PUBLIC_URL + "/Assets/farmer_removebg.png"}
            className={styles.farmer}
          />
        </div>
        {account && <p>연결된 지갑 주소 : {account}</p>}
        {/* <p className={styles.p}></p>
      <p className={styles.p}>
        <span></span>
      </p>
      <p className={styles.p}></p>
      <p className={styles.p}></p> */}
        <br></br>
        <br></br>
        {/* <Button onClick={onClickButton}>
        <Logo src="/essets/images/metamask_logo.png" alt="Logo" />
        {onboardButtonText}
      </Button> */}
        <div className={styles.p}>
          <CustomBtn
            customSx={{
              width: "300px",
              height: "100px",
              fontSize: "20px",
              letterSpacing: 3,
            }}
            bgColor={"mainPink"}
            onclick={onClickButton}
            // btnWord={btnName}
            btnWord={onboardButtonText}
          />
          <img
            src={process.env.PUBLIC_URL + "/Assets/helpButton.png"}
            className={styles.help}
            onClick={onclickAlert}
          />
        </div>
        <br></br>
        <br></br>
        {isLogin ? (
          <div className="text-center">My Wallet: {account}</div>
        ) : (
          <div className={styles.p}>로그인해주세요!</div>
        )}
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
// import MetaMaskOnboarding from "@metamask/onboarding";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CustomBtn from "../../Common/UI/CustomBtn/CustomBtn";
import { loginState } from "../../Recoil/atoms/auth";
import { SSFTokenAddress, web3 } from "../../Web3Config";



//// component
const Login = () => {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [onboardButtonText, setOnboardButtonText] = useState<string>("");
  const [account, setAccount] = useState("");
  const btnName = isLogin ? '로그아웃' : '로그인';

  useEffect(() => {
    initialize();
  }, []);

  const { ethereum } = window;
  // const currentUrl = new URL(window.location.href);
  // const forwarderOrigin ="https://j6e106.p.ssafy.io/";
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
    window.open('https://metamask.io/download.html');
    // onboarding.startOnboarding();
  };

  // 메타마스크 연결
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setAccount(accounts[0])

      // NCT토큰 자동불러오기 (이미 등록되어있어도 뜸.. 이건 해결방법은 없음(못찾는게아니라 애초에 방법이없음))
      // https://coder-solution.com/solution-blog/288728 참고
      
      
      
      const chainId = 31221
      const rpcurl = "http://20.196.209.2:8545"
      

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

  return (
    <>
      {isMetaMaskInstalled() ? (
          <h1>지갑에 연결하세요</h1>
      ) : (
          <h1>지갑이 없으신가요?</h1>
      )}
      {account && <p>연결된 지갑 주소 : {account}</p>}
      <p>저희 사이트에는 개인지갑을 편리하고 안전하게 관리할 수 있는</p>
      <p>
        구글 확장프로그램인 <span>메타마스크</span>를 이용하여 로그인 합니다
      </p>
      <p>이미 지갑을 소유하셨다면 회원가입 절차 필요없이</p>
      <p>서비스를 바로 이용할 수 있습니다</p>
      {/* <Button onClick={onClickButton}>
        <Logo src="/essets/images/metamask_logo.png" alt="Logo" />
        {onboardButtonText}
      </Button> */}
    
      <CustomBtn customSx={{width:"300px", height:"100px",
          fontSize:"20px", letterSpacing: 3}}
          onclick={onClickButton}
          // btnWord={btnName}
          btnWord={onboardButtonText}
        />
        {isLogin ? 
          <div className="text-center"> 
          My Wallet: {account} 
          </div> 
          : <div className="text-center">로그인해주세요!</div>}
    </>


  );
};

export default Login;
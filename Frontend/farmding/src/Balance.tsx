
// web3
import { formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomBtn from './Common/UI/CustomBtn/CustomBtn';
import { getBalance } from './utils/Tokens';
// import web3 from 'web3';
// const eth = window.ethereum;

const RPC_URL = "http://20.196.209.2:8545"
const ERC20_CA = "0x0c54E456CE9E4501D2c43C38796ce3F06846C966"



function Balance() {
  const { ethereum } = window;
  const navigate = useNavigate();
  const [balance, setBalance] = useState('');
  const [account, setAccount] = useState('');
  const [isAccountChanged, setIsAcountChanged] = useState(false);
  const currentAccount = ethereum.selectedAddress;
  ethereum.on('accountsChanged', (accounts: any) => {
    setIsAcountChanged(true);

  })

  const onClickButton = () => {
    navigate('/login');
  };
  useEffect(() => {
    (async function () {
      setAccount(currentAccount)
      const currentBalance:any = await getBalance(ethereum.selectedAddress)
      setBalance(currentBalance)
      setIsAcountChanged(false)
      // setBalance(Number(currentBalance) / 10 ** 18);
    })();
	}, [isAccountChanged]);

  return (
    <div>
      {ethereum.isConnected() ? (
        <div>
          <h1>my wallet</h1>
          <div>
            <p>Account: {account}</p>
            <p>잔고:{balance}</p>
            {/* <p>잔고: {balance &&  Number(formatEther(balance)).toFixed(4)}
                SSF
            </p> */}
          </div>

        </div>
      )
        : (
          <>
            <h1> 지갑을 연결해주세요! </h1>
            
            <CustomBtn customSx={{width:"300px", height:"100px",
            fontSize:"20px", letterSpacing: 3}}
            onclick={onClickButton}
            // btnWord={btnName}
            btnWord="지갑 연결하기"
          />
          </>
        )
      }
    </div>
  );
}

export default Balance;
















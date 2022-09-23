
// web3
import { formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { getBalance } from './utils/Tokens';
// import web3 from 'web3';
const eth = window.ethereum;

const RPC_URL = "http://20.196.209.2:8545"
const ERC20_CA = "0x0c54E456CE9E4501D2c43C38796ce3F06846C966"



function Balance() {
  const [balance, setBalance] = useState('');
  const [account, setAccount] = useState('');
  useEffect(() => {
    (async function () {
      setAccount(eth.selectedAddress)
      const currentBalance:any = await getBalance(eth.selectedAddress)
      setBalance(currentBalance)
      // setBalance(Number(currentBalance) / 10 ** 18);
    })();
	}, []);

  return (
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
  );
}

export default Balance;
















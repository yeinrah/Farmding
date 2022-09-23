
// web3
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { injected } from "./lib/connectors";

// import web3 from 'web3';


export interface IResult {
  _hex: string;
  _isBigNumber: boolean;
}

function Test() {
  const { chainId, account, library, active, activate, deactivate} = useWeb3React();
  const [balance, setBalance] = useState('');
  const handleConnect = async () => {
    try {
      await activate(injected, (error) => {
				// 크롬 익스텐션 없을 경우 오류 핸들링
				if ('/No Ethereum provider was found on window.ethereum/')
					throw new Error('Metamask 익스텐션을 설치해주세요');
			});
    } catch (err) {
			console.log(err);
      alert(err);
			window.open('https://metamask.io/download.html');
		}

    if (active) {
      deactivate();
      return;
    } 
    
    // activate(injected, (error) => {
    //   if('/No Ethereum provider was found on window.ethereum/'.test(error)) {
    //     window.open('https://metamask.io/download.html');
    //   }
    // });
  }
  useEffect(() => {
    // (async function () {
    //   const balance_1 = await web3?.eth.getBalance(account);
    //   if (balance_1 !== undefined) {
    //     setBalance(Number(balance_1) / 10 ** 18);
    //   }
    // })();

		if (account) {
			library
				?.getBalance(account)
				.then(
          (result: IResult) => {
            setBalance(result._hex)
            console.log(result, 'test')
          }
        );
		}
	}, [account, library]);

  return (
    <div>
      <h1>my wallet</h1>
      <div>
        <p>Account: {account}</p>
        {/* <p>balance:{balance}</p> */}
        
        <p>ChainId: {chainId}</p>
        <p>잔고: {balance && account && Number(formatEther(balance)).toFixed(4)}
							ETH
        </p>

      </div>
      <button type="button" onClick={handleConnect}>{active ? 'disconnect':'connect'}</button>
      {/* { active ? 
        <div>
          <p>Account: {account}</p>
          <p>ChainId: {chainId}</p>
        </div>
        :
        <div>
        
          <button type="button" onClick={handdleConnect}>connect'</button>
        </div>
      } */}
    </div>
  );
}

export default Test;

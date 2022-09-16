
// web3
import { useWeb3React } from '@web3-react/core';
import { injected } from "./lib/connectors";

function Test() {
  const { chainId, account, active, activate, deactivate} = useWeb3React();
  const handdleConnect = async () => {
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

  return (
    <div>
      <h1>my wallet</h1>
      <div>
        <p>Account: {account}</p>
        <p>ChainId: {chainId}</p>
      </div>
      <button type="button" onClick={handdleConnect}>{active ? 'disconnect':'connect'}</button>
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

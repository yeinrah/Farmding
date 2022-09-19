/* hooks/ 디렉토리 useWeb3.jsx 파일 */
 
import React, { useEffect, useState } from 'react';
import Web3 from 'web3'; // NodeJs 환경에서만 쓸 수 있는 기능은 제외하고 최소기능만 가져오기
 
// 커스텀 훅의 역할은 상태를 담고 있는 컴포넌트
// 자주 사용하는 상태들은 커스텀 훅으로 빼서 사용 가능하다.
const useWeb3 = () => {
    // 메타마스크에서 사용하고 있는 계정과 관련된 상태
    const [account, setAccount] = useState(null);
    // 클라이언트와 메타마스크가 통신하기 위한 web3
    const [web3, setWeb3] = useState(null);
 
    useEffect(() => {
        // 즉시 실행 함수
        // (async () => {
        //     if (!window.ethereum) return;
 
        //     // rpc 통신 , Promise 객체 반환
        //     const [address] = await window.ethereum.request({
        //         method: 'eth_requestAccounts',
        //     });
 
        //     setAccount(address);
 
        //     const web3 = new Web3(window.ethereum);
        //     setWeb3(web3);
        // })();
    }, []);
 
    return [web3, account];
};
 
export default useWeb3;
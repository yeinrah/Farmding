/**
 * @author eunmin
 */

import Web3 from "web3";
// import CallAPI from './API.js';

// const callApiList = [
//   'transferFrom', // NFT 이전 => ownerAddr, tokenId 필요
//   'createSale', // 판매 생성
//   'bid', // 입찰
//   'purchase', // 즉시 구매
//   'confirmItem', // 구매 확인
//   'cancelSales', // 판매 취소
// ];

const RPC_URL = "http://20.196.209.2:8545";
// const provider = new providers.Web3Provider(Web3.currentProvider);
const web3 = new Web3(
  window?.web3?.currentProvider || //  메타마스크 프로바이더
    "http://localhost:8545"
);
// const provider = new providers.Web3Provider(
//   window.ethereum || 'http://localhost:8545'
// );
/**
 * 트랜잭션 전송을 위한 공통 로직
 * 전달받은 개인키로 서명한 트랜잭션을 전송합니다.
 * @param {String} fromAddr 보내는 주소
 * @param {String} privKey 보내는 주소의 개인키
 * @param {String} toAddr 받는 주소
 * @param {String} data 입력 데이터
 * @returns {Promise} 함수 실행 결과
 */
export default async function sendTransaction(toAddr, amount) {
  const accounts = await web3.eth.requestAccounts(); // 메타마스크에 선택된 지갑으로 트랜잭션 서명을 함
  // const signer = provider.getSigner()
  // console.log('서명 signer:', signer)
  // const txHash = await signer.sendTransaction({
  //   to: toAddr,
  //   // value: utils.parseUnits( amount, 'SSF').toHexString()
  //   value: amount
  // })
  const txHash = await web3.eth.sendTransaction({
    from: accounts[0],
    to: toAddr,
    value: amount,
    data: "",
  });

  return txHash;
}
// export default async function sendTransaction(
//   fromAddr,
//   privKey,
//   toAddr,
//   data,
//   tokenId = null,
// ) {
//   const gas = await data.estimateGas({ from: fromAddr });

//   // 트랜잭션 객체
//   const tx = {
//     gas: gas,
//     to: toAddr,
//     data: data.encodeABI(),
//   };

//   let result = null;

//   // 서명
//   await web3.eth.accounts.signTransaction(tx, privKey).then(async (rawTx) => {
//     // 트랜잭션 보내기
//     await web3.eth
//       .sendSignedTransaction(rawTx.rawTransaction)
//       .once('receipt', (receipt) => {
//         result = receipt;
//       })
//       .on('confirmation', async (confirmationNumber) => {
//         if (confirmationNumber === 1) {
//           console.log('tx 확인 start');

//           // // API 요청이 필요한 경우를 위한 분기처리
//           // if (callApiList.includes(data._method.name)) {
//           //   if (tokenId) {
//           //     await CallAPI(
//           //       data._method.name,
//           //       data.arguments,
//           //       fromAddr,
//           //       tokenId,
//           //     );
//           //   } else {
//           //     await CallAPI(data._method.name, data.arguments, fromAddr);
//           //   }
//           // }
//         } else if (confirmationNumber === 3) {
//           console.log('confirm end!');
//         }
//       })
//       .on('error', (error) => {
//         console.log(error);
//       });
//   });
//   return result;
// }
